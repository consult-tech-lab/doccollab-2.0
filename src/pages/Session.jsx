import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import SessionRoom from '@/components/session/SessionRoom';

export default function Session() {
  return (
    <div>
      <PageHeader
        eyebrow="Live Session"
        title="Rounds, reimagined."
        accent="In real time."
        description="A session-based collaboration room for patient rounds and remote care. Tagging, attachments, ambient AI, and wearable vital sync — all encrypted."
      />
      <SessionRoom />
    </div>
  );
}