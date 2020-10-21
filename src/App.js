import React from "react";
// import InputManager from "./InputManager";
import ShapeDiverLoad from "./ShapeDiverLoad";

const TICKET_ID =
  // SD demo ticket - shelf
  // "20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5";
  // SD demo ticket - ring
  // "ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba";

  // ImageLines Ticket - Materials version
  // "66883e1bcc9278c8f5cdc220d3c7adfe342404c88a189ee7115813a825a7003b081c85347715882190ea46a8260cd99714b0b14a73905090b83cb6a7029c8e1778b2da378b1493e236ca13d097e61a25526a256aca653493d47fa8f234fcdca097b2ff6764e27d9a1d6743f981538c938bfc5f124b23f8ef264daa9b86079329d1b4302b3aa700-85f0750e4ee2d98a1284e8ce5b74310f";
  // ImageLines, no backend access - does this load faster?
  // "3f58d9bb3a14f4745c5d8b643fdd3ece81354b9c693497fe9ef9dfc08212ac6f6dcee743867c1fe7f9d813e341637f6450a9e6e851ef24ba1843d6b9bed0162c08ee6b9867a6494d798fad9889c4c1566ecd1fcdaaf5fdfb51c521a25e6e07412cfde32cc4ed7d0a821cc83d1e88a850d8ad8a826418-8e7d43014857f61f60833b1f0c7366a9";
  // ImageLines_0.4.51 (?)
  // "d20b5c2cef93c7aa5941bbdd1c19005a4d59e5c7950feb07515610f8f4c4e267d200aa3797cad7fcfca0eaeeec1251fdcaff5b17acb424c257f66b77614271e27171ddfd28806988d56335ae65dffa1caf790127147e03781a214c2ae5ce4846d27e66cb7803d112b2e8480154933cc3076eb4603850cdef8e3d1d6bf91f2a7f12d6c6038d68e1-b057fbdec749f4741ba2aa986879417c";
  // ImageLines_0.4.55 - no backend
  // "454ee770e6885dadbbd9b267d4513140b82a91a0ed8193f7d228af359427bc64684c75261fc94360ee9066d881e5894101216b38b87472f93548fda0756c64d7e8d7a45d02cf9580dccfd9bfdddc4bf443234004d10274bedd4730881e6a5c0c4fbcf91e7374dfbc003c13df018cb65f02d73c13c5ca-66b0e9715a83d706800f2d374a304a6e";
  // ImageLines_0.4.55 - backend access
  // "cc271d6211aaeae7a023bd1c1d13186902c6d9feabdc5bb8dfc1c14eee9f0fe945b296d2047a57874323dc385efbc01b69d04c07ceca94b467cba6581a0bf1dee1ad3fbf5bf8bdbdedced50685b7116798ab07fdd495dd5ccaa5e75ecfdd1a96e0d82872b1d487438bcbdbbf348084c60f521acf9f59104a7f50e0a8f678d6ffedb9a7992851b4-108c4a80cd1aeb56270a42de698adc60";
  // ImageLines_1.0.2 - backend access
  // "4d07178e40a85f444db20097283fb4cf2e38637539a1956c469109ef2b88297f6eb59408522b6850d93548e637fe5b444cdf470198a284b6b33f190a8737aef1d1393a567c254a8d9214ccbae3741e4b7b7b6d49ea1250e8ddb792bbd3a2a921fb2bf8a5c8cd8468fd2a399bb6af659e3c201ad9d148ed96ed842826c191c55075fd486698dd8d-b56f0042a37df9ae8051a9aa90b4f9bc";
  // ImageLines_1.1.0 - direct embedding ticket
  // "02bc37283af21d1f9d2e19d5b883eccc6b0bc3229abef34f27117ef67f9093dafa71c30d455fcf91ddd4b37ef13a5aef3f56907016e046cc2498f60840f785b4d195c13934eb148761325e5ed3a2dfcb49132da516b30a6c606de1f41eb7cf245a342bcce85e5f9d555a70127314314b694908320bcc-a34f8c1042cabd3fa89c35d74a45d86c";
  // ImageLinse_1.1.1 - direct embedding ticket
  // "0e27aad3edafd90d3f975a52180850ac3b8356e8d533859c7cf0547ff1d93ba5c55a2aff4a97cf1b64ee779f189042cc3023adcffbfeac3de1924025fb092a00cf31f100192d7ab64af70067c2ef69ea5cb82f79fb8b9363a3a1a929fd230a7dbeef635281456ea22f19ee715e173b71deffe3b272ca-db0125c7a214c397d674c91c3f449383";
  // ImageLines_1.1.2 - direct embedding ticket
  // "6a9ff87914a0e37557173af827075e83d46914fef5aa15d7c48153875e319471f0f32e9ae8f1423b82a4f3d7f3b507dcc651d85275ef83ef7bcc093c0bfb0ccc5487b79a952bdf39f117232a7ad1734908ef8b0dba2e31efb73278286c68881fd6ff20725669b4db9a2fc268be0739563d245a0c6ac2-c95752dfb7305408532b0d94cce90b02";
  // ImageLines_1.1.15 - direct embed
  // "16d528b7d03cfcb85c69211bdde816424563d2e10f466f0604b96135eaee7b80807f1734a936d5aac19ec379f2e70b4cbb85c28c8d948edd3d63227724d59c9025541114cca70c5326bdd16350289d0f193e6eacf9ab2df631d4365f2daa51ade28d9fcf68bf1ae9daefbaaa8490623349db89343aa2-d9ba341c25564e65cbb006340159d43f";
  // ImageLines_1.1.16 - direct embed
  // "1536412ea83f28d53bd44392de94a72b72c95bea793b9b1fb8c56b0f9c954abbc99ac8d584bf61a711671ff0b3b998b0da8427fc80cc812d1809a60777ec9e703816951e883f0da5d84feb983df9df50182ceb6bda3b9b1e9527875360ea949933594c6aac81d4721b1218a73abd64e76b7d94c44837-44b7e059b74e3e015dc1aa73d48e1e75-c2c8a8b447cfa49268c01337218612c8";
  // ImageLines_1.2.0 - direct embed
  // "037d6c15a19c407371b9f1a66b352f356e39085772784dd69546ee0996eea6e306087cd17d388a18c50d9eda455e74a1174de182a088da8bd76e44f5671bf1e206886809577c85a1a8d85bf8dc4810b1dfc4ecbf1bc174dbff02e6d6dc038d62075edd1fffeeeaf34d996f895ef06ac217d9061093ea-bdf347438f4846a5ac903bb97bea16c6-0c83b54a6c0b2191532627fc35fb7c19";
  // ImageLines_1.2.1 - direct embed
  // "a0b456316c156ffe18854759cb46be05372298935015a06a82dea7e2822722668cf3e5ba0c154ed5b1d96b3bf412b1bd9c7bb85e7c690a56830fea858da02420d50f6ebaf4c40e55d799483bd07e18ac1c5423f470f45dd4d99d8029b3171f6b4bf405d4951813f70898ca5889a08ea6c3fb6245a5dd-4ab73f2274adcb134f5f955e543ad4ee";
  // ImageLines_1.2.2 - direct embed
  // "f80ffffe8b4f383c48a4e591931eb5c3c0cedefc13edb2b121e59bb0f71368eb37a5705c15e42bf57c54e004dfa2f47989bf9cbfe7be4bff49cb4a686cf73a64f126a49eafc00544d43825801820fb63776644ffb579d9a64c396379a075b6329c9e6bf8d50b5dc6dc036b9630e64cea369efbc09cb2-b2766323f8d6d626f2f70a00de11088f";
  // ImageLines 1.2.3 - direct embed
  // "b7d660d0c6a60283be1396f35fcfaa354edc06025e181fe2662778beb5ee3594563cdc090b898c37fca3e7bca3aa90ab827726bbe0a3b3383ab8c8669fd35369edf8db72bb8f968608f060c78d5a60585a00dc462b3194de6ceded97ae203231bbb910a603085c54c4159f558f7d163fd75df5f98295-4221282867568527d22b0d26977517e8";
  // Imagelines 1.2.4 - direct embed
  // "10b27fb5123b8b9c1de9f98e6029d4de051426eea9ae96b26b0264e4f421357ca279aa3448259f39a0d0544e1fd9a8619ac79eb64de7937061969908fa312a6e6e8abc7353a7732b2cc22c22451b97a32d68ff1e74c867acf92f3c95dfd8f5e7e638cdd832e0f7e0873ce5cbf5cba2dc45de670df7f9-e5a1b26f50bbf3e578a20ba947893f04";
  // ImageLines 1.2.5 - direct embed
  "1c2fce86389111249f327759198d1b2dcfeeeda8ba2bac1fd800aa812ab5550f98035d94aa8c8471bbfd33f52a12db235ef9018c182f30812f08e87a852d818a3937dbceda0410927e99e334be353b71990ae1bd84175792f5598998969de41d98d2fb1be791cb997bd61b25fa92c90faba0b79e72c8-df8bd848cfd5b520cb13f2a650f45833";
// ImageLines 1.3.0 - direct embed
  // "2cde96eca7fd1adba19c4af51260e4187780b29fdad92e8f43059510ded7f8080c83394cf70a011111a5fdcc594cc13de36dae3e878b73cc88506a93280ad4c65eba838bdefbd87a040ccf6c70f5735a3e604df001947a6410f831621b30a51de6e65a510eaa4741d66bcfe8d5af96c4142568814e86-55118b5f4bbe11ba9e3a0afd212f19e7"

const App = () => {
  return (
    <div>
      <ShapeDiverLoad ticket={TICKET_ID} liveLink={true} />
    </div>
  );
};

export default App;
