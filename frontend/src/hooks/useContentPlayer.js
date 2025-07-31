import { useState } from 'react';

export const useContentPlayer = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [currentContentType, setCurrentContentType] = useState(null);

  const openPlayer = (content, contentType) => {
    setCurrentContent(content);
    setCurrentContentType(contentType);
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
    setCurrentContent(null);
    setCurrentContentType(null);
  };

  return {
    isPlayerOpen,
    currentContent,
    currentContentType,
    openPlayer,
    closePlayer
  };
};