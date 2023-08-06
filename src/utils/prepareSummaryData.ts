export default function prepareSummaryData(notes: Notes) {
  const summaryData: SummaryData = {};
  for (let i = 0; i < notes.length; i++) {
    const currNote = notes[i];
    if (!summaryData[currNote.category]) {
      summaryData[currNote.category] = { archived: 0, active: 0 };
    }
    currNote.archived
      ? (summaryData[currNote.category].archived += 1)
      : (summaryData[currNote.category].active += 1);
  }
  return summaryData;
}
