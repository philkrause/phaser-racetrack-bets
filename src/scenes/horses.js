class Horses {

  constructor() {
    this.horses = [];
  }
    
  getHorses() {

    this.horses = [{
        name: 'Big Red',
        dashing: false,
        speed: 3,
        stamina: 1,
        rank: 0,
        profilepic: 'horse0_profile'
      },
      {
        name: 'Leroy',
        dashing: false,
        speed: 1,
        stamina: 1,
        rank: 0,
        profilepic: 'horse1_profile'
      },
      {
        name: 'Goldie',
        dashing: false,
        speed: 1,
        stamina: 1,
        rank: 0,
        profilepic: 'horse2_profile'
      },
      {
        name: 'Gandalf',
        dashing: false,
        speed: 1,
        stamina: 1,
        rafromnk: 0,
        profilepic: 'horse3_profile'
      },
      {
        name: 'Vader',
        dashing: false,
        speed: 1,
        stamina: 1,
        rank: 0,
        profilepic: 'horse4_profile'
      }
    ]  

        return this.horses
    };
}


export default Horses;