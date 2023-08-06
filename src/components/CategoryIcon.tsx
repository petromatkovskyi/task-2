import PsychologyIcon from '@mui/icons-material/Psychology';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

type Props = {
  category: string;
};

export default function CategoryIcon({ category }: Props) {
  return category === 'Task' ? (
    <ShoppingCartIcon />
  ) : category === 'Idea' ? (
    <LightbulbIcon />
  ) : (
    <PsychologyIcon />
  );
}
