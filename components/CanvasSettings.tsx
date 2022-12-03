import { useRecoilState } from 'recoil';
import {
  barLengthAtom,
  canvasRotationAtom,
  canvasShapeAtom,
  canvasStateAtom,
  qualityStateAtom,
} from '../atoms/canvasStateAtoms';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/solid';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import SectionTitle from './SectionTitle';


export default function CanvasSettings() {
  const [quality, setQuality] = useRecoilState(qualityStateAtom);
  const [canvas, setCanvas] = useRecoilState(canvasStateAtom);
  const [rotation, setRotation] = useRecoilState(canvasRotationAtom);
  const [shape, setShape] = useRecoilState(canvasShapeAtom);
  const [barLength, setBarLength] = useRecoilState(barLengthAtom);
  const handleChange = (event: SelectChangeEvent) => {
    setQuality(event.target.value);
  };
  const handleRotationChange = (event: SelectChangeEvent) => {
    setRotation(event.target.value);
  };
  const handleLengthChange = (event: SelectChangeEvent) => {
    setBarLength(event.target.value);
  };

  const handleShapeChange = () => {
    if (shape === 'rect') {
      setShape('arc');
    } else if (shape === 'arc') {
      setShape('rect');
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0  z-10 flex h-screen w-screen items-center justify-center bg-black bg-gradient-to-bl from-orange-500 to-sky-500">
      <SectionTitle title="Settings" />
      <div className="flex h-[500px] w-[350px] flex-col items-center justify-center space-y-6 rounded pt-10 md:w-[450px] lg:w-[550px]">
        <Button
          className="z-50 ml-2 flex cursor-pointer flex-col items-center space-y-2"
          onClick={() => setCanvas((prev: boolean) => !prev)}
        >
          {canvas ? (
            <>
              <p>Show Settings</p>
              <EyeSlashIcon className="w-7" />
            </>
          ) : (
            <>
              <p>Show Canvas</p>
              <EyeIcon className="w-7" />
            </>
          )}
        </Button>

        <Button className="flex flex-col space-y-2">
          <p>Change Shape</p>
          {shape === 'rect' ? (
            <>
              <div
                onClick={handleShapeChange}
                className="h-5 w-5 border border-dotted border-sky-500 bg-sky-500 active:scale-[0.9] lg:hover:bg-sky-500"
              />
            </>
          ) : (
            <div
              onClick={handleShapeChange}
              className="h-5 w-5 rounded-full border  border-dotted border-sky-500 bg-sky-500 active:scale-[0.9] lg:hover:bg-sky-500"
            />
          )}
        </Button>

        <FormControl size="small">
          <InputLabel className="text-xl text-[#1871c9] " id="fft size">
            FFT Size
          </InputLabel>
          <Select
            labelId="fft size"
            id="fft size"
            size="small"
            variant="outlined"
            value={quality}
            onChange={handleChange}
            className="mt-4 w-[130px] text-white"
            label="fft size"
          >
            <MenuItem className="menuitem" value={128}>
              (128bit)
            </MenuItem>
            <MenuItem className="menuitem" value={1024}>
              (512bit)
            </MenuItem>
            <MenuItem className="menuitem" value={2048}>
              (2048bit)
            </MenuItem>
            <MenuItem className="menuitem" value={4096}>
              (4096bit)
            </MenuItem>
            <MenuItem className="menuitem" value={8192}>
              (8192bit)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel className="text-xl text-[#1871c9] " id="rotations">
            Rotations
          </InputLabel>
          <Select
            labelId="rotations"
            id="rotations"
            size="small"
            variant="outlined"
            value={rotation}
            onChange={handleRotationChange}
            className="mt-4 w-[130px] text-white"
            label="rotations"
          >
            <MenuItem className="menuitem" value={1}>
              1
            </MenuItem>
            <MenuItem className="menuitem" value={2}>
              2
            </MenuItem>
            <MenuItem className="menuitem" value={4}>
              4
            </MenuItem>
            <MenuItem className="menuitem" value={8}>
              8
            </MenuItem>
            <MenuItem className="menuitem" value={16}>
              16
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel className="text-xl text-[#1871c9] " id="length">
            Length
          </InputLabel>
          <Select
            labelId="length"
            id="length"
            size="small"
            variant="outlined"
            value={barLength}
            onChange={handleLengthChange}
            className="mt-4 w-[130px] text-white"
            label="length"
          >
            <MenuItem className="menuitem" value={1}>
              1
            </MenuItem>
            <MenuItem className="menuitem" value={2}>
              2
            </MenuItem>
            <MenuItem className="menuitem" value={3}>
              3
            </MenuItem>
            <MenuItem className="menuitem" value={4}>
              4
            </MenuItem>
            <MenuItem className="menuitem" value={5}>
              5
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
