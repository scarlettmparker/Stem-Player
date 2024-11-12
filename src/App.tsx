import { createSignal, createEffect, type Component, Accessor, Setter } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";
import config from './json/config.json';
import Slider from './components/Slider';
import AudioPlayer from './components/AudioPlayer';
import PlayButton from './components/PlayButton';
import ChangeButton from './components/ChangeButton';
import SweepButton from './components/SweepButton';
import getStems from './utils';
import './global.css';

const App: Component = () => {
  const [song, setSong] = createSignal(0);
  const [title, setTitle] = createSignal("");
  const [stems, setStems] = createSignal<any[] | undefined>([]);
  const [songLength, setSongLength] = createSignal(0);

  const [currentStems, setCurrentStems] = createSignal<string[]>([]);
  const [sliderSignals, setSliderSignals] = createSignal<[Accessor<number>, Setter<number>][]>([]);
  const [playing, setPlaying] = createSignal(false);
  const [masterVol, setMasterVol] = createSignal(1);
  const [currentTime, setCurrentTime] = createSignal(0);

  let scrollRef!: HTMLDivElement;
  let timer: NodeJS.Timeout | null = null;

  // get stems from the back-end
  createEffect(async () => {
    setStems(await getStems(config['song-path']));
    setSongLength(stems()!.length);
  }, [])

  createEffect(() => {
    if (songLength() < 1) return;

    const titles = stems()![song()].filter((stem: string) => !stem.includes("mp3"));
    const filteredStems = stems()![song()].filter((stem: string) => stem.includes("mp3"));
    setCurrentStems(filteredStems);
    setSliderSignals(filteredStems.map(() => createSignal(1)));

    // extract name and stems from return
    titles.map((file: string) => {
      const filteredTitle = (file.split('\\').pop() || title());
      setTitle(filteredTitle.toLowerCase());
    })

    setCurrentTime(0);
  }, [stems(), song()])

  // global timer to sync audio/for controls
  createEffect(() => {
    if (playing()) {
      timer = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 0.01);
      }, 10);
    } else {
      clearInterval(timer!);
    }

    return () => clearInterval(timer!);
  }, [playing()]);

  // a creative solution to my problems
  const setter = (idx: number) => {
    return sliderSignals()[idx][0]
  }

  const getter = (idx: number) => {
    return sliderSignals()[idx][1]
  }

  const setValue = (idx: number, value: number) => {
    const signalSetter = getter(idx);
    signalSetter(value);
  }

  return (
    <MetaProvider>
      <Title>Stem Player</Title>
      {songLength() > 0 && (
        <>
          <ChangeButton className="absolute top-1/2 left-6" text="<" inc={-1} songLength={songLength()} song={song} setSong={setSong} />
          <ChangeButton className="absolute top-1/2 right-6" text=">" inc={1} songLength={songLength()} song={song} setSong={setSong} />
        </>
      )}
      <span class="absolute title-text font-bold text-9xl select-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-60">{title()}</span>
      {currentStems() && currentStems().length > 0 && sliderSignals().length > 0 ? (
        <div class="rounded-2xl bg-white absolute items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-144 h-12 justify-center">
          <Slider step={0.01} min={0} max={1} name={"master"} value={masterVol} setMasterValue={setMasterVol} />
          <div ref={scrollRef} class="flex flex-row w-52 h-fit overflow-x-auto overflow-y-clip scrollbar justify-center">
            {currentStems().map((stem, idx) => (
              <>
                <Slider idx={idx} scrollRef={scrollRef} step={0.01} min={0} max={1} name={stem.replace('.mp3', '')} value={setter(idx)} setValue={setValue} dir="vertical" />
                {setter(idx) !== undefined && (
                  <AudioPlayer idx={idx} name={stem} playing={playing} volume={setter(idx)} master={masterVol} currentTime={currentTime} />
                )}
              </>
            ))}
          </div>
          <div class="absolute top-1/2 right-6 transform -translate-y-1/2">
          <SweepButton className={"relative ml-2"} text={"<<"} inc={-10} time={currentTime} setTime={setCurrentTime} />
            <SweepButton className={"relative ml-2"} text={">>"} inc={10} time={currentTime} setTime={setCurrentTime} />
            <PlayButton className={"relative ml-8"} playing={playing} setPlaying={setPlaying} />
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </MetaProvider>
  );
};

export default App;