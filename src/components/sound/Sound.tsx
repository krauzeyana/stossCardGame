import React, { createRef } from "react";
import { createTypedObjectFromEntries } from "../../utils/objectFromEntries";
import { SoundListType, SoundValue, SoundValueType } from "../../common/gameInfo";

export class Sound extends React.Component {
    static soundList: SoundListType = createTypedObjectFromEntries(
        SoundValue.map((key) => [key, null])
    );

    constructor(props: React.PropsWithChildren) {
        super(props);
        let elem: SoundValueType;
        for (elem in Sound.soundList) {
            Sound.soundList[elem] = createRef<HTMLAudioElement>();
        }
    }

    static playSound(name: SoundValueType) {
        const item = Sound.soundList[name];
        if (item && item.current) {
            item.current.play();
        }
    }
    render() {
        return (
            <div>
                <audio ref={Sound.soundList.cardOpen}>
                    <source src="/sounds/card.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={Sound.soundList.cardShuffle}>
                    <source src="/sounds/cardShuffle.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={Sound.soundList.removeBet}>
                    <source src="/sounds/removeBet.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={Sound.soundList.addBet}>
                    <source src="/sounds/addBet.mp3" type="audio/mpeg" />
                </audio>
                <audio ref={Sound.soundList.win}>
                    <source src="/sounds/win.wav" type="audio/mpeg" />
                </audio>
            </div>
        );
    }
}
