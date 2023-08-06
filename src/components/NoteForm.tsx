import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  ButtonGroup,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import getDatesFromStr from '../utils/getDatesFromStr';
import _ from 'lodash';
import { noteAction } from '../store/notes_slice';
import { DATE_FORMATTER } from '../utils/DATA_FORMATTER';
import { editingNoteAction } from '../store/editingNoteSlice_slice';

type Props = {
  onClose: () => void;
  open: boolean;
  note?: Note | null;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const NoteForm = ({ onClose, open, note }: Props) => {
  const [archived, setArchived] = useState(!!note?.archived);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      content: '',
      category: '',
      archived: false,
    },
  });

  const formReset = () => {
    setValue('name', '');
    setValue('content', '');
    setValue('category', '');
    setValue('archived', false);

    onClose();
    dispatch(editingNoteAction.removeNote());
  };

  const handleClose = () => {
    formReset();
  };
  const handleArchiveToggle = () => setArchived(!archived);

  const setNote = (formData: NoteFormData) => {
    const dates = getDatesFromStr(formData.content);
    console.log({ formData });
    const noteLocal: Note = {
      ...formData,
      created: note?.created || DATE_FORMATTER.format(new Date()),
      id: note?.id || _.uniqueId('note'),
      dates,
    };
    console.log({ noteLocal });
    note?.id
      ? dispatch(noteAction.editNote(noteLocal))
      : dispatch(noteAction.addNote(noteLocal));

    formReset();
    onClose();
  };

  useEffect(() => {
    if (note) {
      setValue('name', note?.name);
      setValue('content', note?.content);
      setValue('category', note?.category);
      setValue('archived', note?.archived);
    }
  }, [note]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="create note"
    >
      <Box sx={{ ...style }}>
        <Typography id="modal-title" variant="h5" marginBottom={2}>
          Create Note
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(setNote)}
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <TextField
            label="Note name"
            {...register('name', {
              required: 'Please fill the field',
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Content"
            {...register('content', {
              required: 'Please fill the field',
            })}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <FormControl error={!!errors.category}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              {...register('category', {
                required: 'Please fill the field',
              })}
              label="Category"
              value={watch('category')}
              error={!!errors.category}
            >
              <MenuItem value="Task">Task</MenuItem>
              <MenuItem value="Random Thought">Random Thought</MenuItem>
              <MenuItem value="Idea">Idea</MenuItem>
            </Select>
            {errors.category && (
              <FormHelperText>{errors.category?.message}</FormHelperText>
            )}
          </FormControl>

          <FormControlLabel
            {...register('archived')}
            control={<Checkbox checked={archived} onChange={handleArchiveToggle} />}
            label="Archive note"
          />
          <ButtonGroup
            variant="text"
            aria-label="vertical contained button group"
            sx={{ display: 'flex', justifyContent: 'end' }}
          >
            <Button type="submit" variant="outlined" color="success">
              {note?.id ? 'Save' : 'Create'}
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Modal>
  );
};

export default NoteForm;
