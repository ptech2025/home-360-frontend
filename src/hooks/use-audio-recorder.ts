import { transcribeRecording } from "@/services/transcription";
import { EventType, TranscriptionSSEMessage } from "@/types/chat";
import { API_URL } from "@/utils/constants";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function useAudioRecorder({
  onTranscriptionComplete,
  eventId,
}: {
  onTranscriptionComplete: (final: string) => void;
  eventId: string;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [timer, setTimer] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sseRef = useRef<EventSource | null>(null);

  // Cleanup function
  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = async () => {
        try {
          const blob = new Blob(chunks, { type: "audio/webm" });
          setIsTranscribing(true);

          transcribeRecording(blob, eventId);

          // Open SSE stream
          const sse = new EventSource(
            `${API_URL}/api/transcribe/${eventId}/stream`
          );
          sseRef.current = sse;

          sse.onopen = () => {
            console.log("Transcription SSE connection opened");
          };

          sse.onerror = (error) => {
            console.error("SSE connection error:", error);
            setIsTranscribing(false);
            setError("Connection error during transcription");
            onTranscriptionComplete("");
            sse.close();
          };

          sse.onmessage = (event: MessageEvent) => {
            try {
              const data: TranscriptionSSEMessage = JSON.parse(event.data);

              if (data.type === "transcribing") {
                setIsTranscribing(true);
              }

              if (data.type === "transcript_error") {
                setIsTranscribing(false);
                setError("Transcription failed");
                onTranscriptionComplete("");
                sse.close();
              }

              if (data.type === "transcript_result" && data.data) {
                onTranscriptionComplete(data.data);
                setIsTranscribing(false);
                sse.close();
              }
            } catch (error) {
              console.error("Failed to parse SSE message:", error);
              setIsTranscribing(false);
              setError("Failed to process transcription response");
              onTranscriptionComplete("");
            }
          };
        } catch (error) {
          console.error("Transcription request failed:", error);
          setIsTranscribing(false);
          setError("Failed to start transcription");
          onTranscriptionComplete("");
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      setError("Failed to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop media stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  return {
    isRecording,
    isTranscribing,
    timer,
    error,
    startRecording,
    stopRecording,
  };
}
