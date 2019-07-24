import { createStore } from 'redux';

const initialState = {
    videoPlayer: {
        queue: [
            {
                id: 1,
                name: 'Something 1'
            },
            {
                id: 2,
                name: 'Something 2'
            },
            {
                id: 3,
                name: 'Something 3'
            },
            {
                id: 4,
                name: 'Something 4'
            }
        ]
    },
    audioPlayers: [
        {
            id: 1,
            name: 'Rain',
            file: 'rain1.mp3',
            visible: true
        },
        {
            id: 2,
            name: 'Star Ship',
            file: 'voy_bridge.mp3',
            visible: false
        },
        {
            id: 3,
            name: 'Fake',
            file: 'fake.mp3',
            visible: false
        }
    ]
};

// const initialState = {
//     players: []
// };

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_VISIBILITY':
            return{
                ...state,
                audioPlayers: state.audioPlayers.map(
                    (audioPlayer) => {
                        console.log(audioPlayer.id + " " + action.id)
                        console.log(audioPlayer.id == action.id)
                        return audioPlayer.id === action.id ? {...audioPlayer, visible: !audioPlayer.visible} : audioPlayer
                    })
            }
        case 'INCREMENT':
            const newPlayer = {type: 'new', id: state.players.length};

            return {
                ...state,
                players: [
                    ...state.players,
                    newPlayer
                ]
            };
        // case 'DECREMENT':
        //     return {
        //         count: state.count - 1
        //     };
        default:
            return state;
    }
}

// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             const newPlayer = {type: 'new', id: state.players.length};

//             return {
//                 ...state,
//                 players: [
//                     ...state.players,
//                     newPlayer
//                 ]
//             };
//         // case 'DECREMENT':
//         //     return {
//         //         count: state.count - 1
//         //     };
//         default:
//             return state;
//     }
// }
// const initialState = {
//     count: 1
// };

// function reducer(state = initialState, action) {
//     switch (action.type) {
//         case 'INCREMENT':
//             return {
//                 count: state.count + 1
//             };
//         case 'DECREMENT':
//             return {
//                 count: state.count - 1
//             };
//         default:
//             return state;
//     }
// }

const store = createStore(reducer);

export default store