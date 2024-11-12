import { createSignal, createEffect, type Component, Accessor, Setter } from 'solid-js';
import { MetaProvider, Title } from "@solidjs/meta";
import config from './json/config.json';
import Slider from './components/Slider';
import AudioPlayer from './components/AudioPlayer';
import getStems from './utils';
import './global.css';
import AltTextButton from './components/AltTextButton';

const App: Component = () => {
  const [song, setSong] = createSignal(0);
  const [title, setTitle] = createSignal("");
  const [stems, setStems] = createSignal<any[] | undefined>([]);

  const [currentStems, setCurrentStems] = createSignal<string[]>([]);
  const [sliderSignals, setSliderSignals] = createSignal<[Accessor<number>, Setter<number>][]>([]);
  const [playing, setPlaying] = createSignal(false);
  const [masterVol, setMasterVol] = createSignal(1);

  let scrollRef!: HTMLDivElement;

  // get stems from the back-end
  createEffect(async () => {
    setStems(await getStems(config['song-path']));
    setCurrentStems(stems()![song()]);
    setSliderSignals(stems()![song()].map(() => createSignal(1)));

    // extract name and stems from return
    currentStems()!.map((stem, idx) => {
      const filteredTitle = (stem.split('\\').pop() || title());
      !stem.includes("mp3") && setTitle(filteredTitle.toLowerCase());
      !stem.includes(".mp3") && setCurrentStems(prevStems => prevStems.filter((_, index) => index !== idx));
    })
  }, [song(), stems()])


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
      <span class="absolute title-text font-bold text-9xl select-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-60">{title()}</span>
      {currentStems() && currentStems().length > 0 && sliderSignals().length > 0 ? (
        <div class="rounded-2xl bg-white absolute items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex w-144 h-12 justify-center">
            <Slider step={0.01} min={0} max={1} name={"master"} value={masterVol} setMasterValue={setMasterVol} />
            <div ref={scrollRef} class="flex flex-row w-64 h-fit overflow-x-auto overflow-y-clip scrollbar justify-center">
              {currentStems().map((stem, idx) => (
                <>
                  <Slider idx={idx} scrollRef={scrollRef} step={0.01} min={0} max={1} name={stem.replace('.mp3', '')} value={setter(idx)} setValue={setValue} dir="vertical" />
                  {setter(idx) !== undefined && (
                    <AudioPlayer idx={idx} name={stem} playing={playing} volume={setter(idx)} master={masterVol} />
                  )}
                </>
              ))}
          </div>
          <AltTextButton className={"absolute top-1/2 right-6 transform -translate-y-1/2"} playing={playing} setPlaying={setPlaying} />
        </div>
      ) : (
        <>Loading...</>
      )}
    </MetaProvider>
  );
};

export default App;