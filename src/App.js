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

  // ImageLines_0.4.55
  "454ee770e6885dadbbd9b267d4513140b82a91a0ed8193f7d228af359427bc64684c75261fc94360ee9066d881e5894101216b38b87472f93548fda0756c64d7e8d7a45d02cf9580dccfd9bfdddc4bf443234004d10274bedd4730881e6a5c0c4fbcf91e7374dfbc003c13df018cb65f02d73c13c5ca-66b0e9715a83d706800f2d374a304a6e";
const App = () => {
  return (
    <div>
      {/* <ShapeDiverLoad ticket={TICKET_ID} /> */}
      {/* <InputManager ticket={TICKET_ID} /> */}
      <ShapeDiverLoad ticket={TICKET_ID} liveLink={true} />
    </div>
  );
};

export default App;
