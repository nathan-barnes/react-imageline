import React from "react";
// import InputManager from "./InputManager";
import ShapeDiverLoad from "./ShapeDiverLoad";

const TICKET_ID =
  // SD demo ticket - shelf
  // "20f9d15ecb236b79c4c342f2714558f571d34ae17fc3678f09a4e6742f28045119010401d66d47bd2f4c0a4a5ae92be36c560606effd0a98ec6ebdcec3975a5fd947d156338ff31e4a3c142a7eb4aa864f62d3db3938be957ab118903125b434296303731c19772d5a7fc89ae42348eba26888a80fdd-75013a6ebb275765f424fa8c2b7976a5";
  // SD demo ticket - ring
  // "ad7f8b415e8e520f99133becbc185a08c8929a7540d1405acbb398b41e3fc53315f1bd62cc929101407f71ceb5017c6ffbf54b3762416c1410c11d2d82cc0f2f9b8d44ac947ea2043e501fcd66abc1fc38fb9de036318cd301d42ac943a4e310e57060ec6f0b4c229844f89b87096ea2978c18808293-c1858d6c06b7a0b6532a92750cb740ba";

  // Louver Surface Tickets:
  //   "8c0136f871bbb5a5760b60235007e9c01cf1defa54ae7cec412bcbfe3684a7a4ec90901a16f00434bf648683b04429b139e3aeea4d9fefe7705a8d53b5a968e90d1fecbc712c84918d4be08ee55263a41868654d68858c4d147877d0d7b0a83cd47b860cfd22567ab29108e3e6305ba70ab62e65f6ce0d79d2762104d9fffc0eaaef1a9067d8a3-55581975217b3e0a7957b729b7979975";
  //"7d502ff7659cb1578a746208699f1716990c5161ba5ffc688ebb5a0b61467e4223f86e90b315f53b1b44324dbe8fd367e69bf9fd9916c774fd6fa3e445363e30104a6aedc57cfb9baddab8e1a06270656f73904ce79fa40d9714b1ec42b0fbf3778706477b99cc70f0efed36943119c23d5a1bf798991d655269446c40a80e986fb33192261cfe-99e8d6b22772ff5c1a4802bf11de3b07";
  // ImageLines Ticket - Materials version
  "66883e1bcc9278c8f5cdc220d3c7adfe342404c88a189ee7115813a825a7003b081c85347715882190ea46a8260cd99714b0b14a73905090b83cb6a7029c8e1778b2da378b1493e236ca13d097e61a25526a256aca653493d47fa8f234fcdca097b2ff6764e27d9a1d6743f981538c938bfc5f124b23f8ef264daa9b86079329d1b4302b3aa700-85f0750e4ee2d98a1284e8ce5b74310f";
// "d20b5c2cef93c7aa5941bbdd1c19005a4d59e5c7950feb07515610f8f4c4e267d200aa3797cad7fcfca0eaeeec1251fdcaff5b17acb424c257f66b77614271e27171ddfd28806988d56335ae65dffa1caf790127147e03781a214c2ae5ce4846d27e66cb7803d112b2e8480154933cc3076eb4603850cdef8e3d1d6bf91f2a7f12d6c6038d68e1-b057fbdec749f4741ba2aa986879417c";

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
