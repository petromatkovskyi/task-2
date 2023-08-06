type Note = {
  name: string;
  category: string;
  content: string;
  archived: boolean;
  created: string;
  id: string;
  dates: string;
};

type Notes = Note[];

type State = {
  notes: Notes;
  editingNote: Note | null;
};

type SummaryData = {
  [key: string]: {
    archived: number;
    active: number;
  };
};

type NoteFormData = {
  name: string;
  category: string;
  content: string;
  archived: boolean;
};

type EditingNote = Note | null;
