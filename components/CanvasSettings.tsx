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
  Tooltip,
} from '@mui/material';

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
    <div className="w-screen h-screen bg-gradient-to-bl from-orange-500 to-sky-500  fixed top-0 left-0 right-0 bottom-0 bg-black z-10 flex items-center justify-center">
      <h1 className=" absolute top-24 font-black ">
        Canvas Settings
      </h1>
      <div className="flex flex-col space-y-6 items-center justify-center w-[350px] md:w-[450px] lg:w-[550px] h-[500px] rounded">
        <Button
          className="flex flex-col space-y-2 items-center ml-2 cursor-pointer z-50"
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
                className="w-5 h-5 border border-dotted bg-sky-500 border-sky-500 lg:hover:bg-sky-500 active:scale-[0.9]"
              />
            </>
          ) : (
            <div
              onClick={handleShapeChange}
              className="w-5 h-5 border border-dotted  bg-sky-500 border-sky-500 rounded-full lg:hover:bg-sky-500 active:scale-[0.9]"
            />
          )}
        </Button>

        <FormControl size="small">
          <InputLabel className="text-[#1871c9] text-xl " id="fft size">
            FFT Size
          </InputLabel>
          <Select
            labelId="fft size"
            id="fft size"
            size="small"
            variant="outlined"
            value={quality}
            onChange={handleChange}
            className="text-white mt-4 w-[130px]"
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
          <InputLabel className="text-[#1871c9] text-xl " id="rotations">
            Rotations
          </InputLabel>
          <Select
            labelId="rotations"
            id="rotations"
            size="small"
            variant="outlined"
            value={rotation}
            onChange={handleRotationChange}
            className="text-white mt-4 w-[130px]"
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
          <InputLabel className="text-[#1871c9] text-xl " id="length">
            Length
          </InputLabel>
          <Select
            labelId="length"
            id="length"
            size="small"
            variant="outlined"
            value={barLength}
            onChange={handleLengthChange}
            className="text-white mt-4 w-[130px]"
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
