class Horses {

  constructor() {
    this.horses = [];
  }
    
  getHorses() {

    this.horses = [{
        name: 'Viscount',
        dashing: false,
        speed: 3,
        stamina: 1,
        rank: 0,
        profilepic: 'horse0_profile'
      },
      {
        name: 'Grace',
        dashing: false,
        speed: 1,
        stamina: 1,
        rank: 0,
        profilepic: 'horse1_profile'
      },
      {
        name: 'Rufus',
        dashing: false,
        speed: 1,
        stamina: 1,
        rank: 0,
        profilepic: 'horse2_profile'
      },
      {
        name: 'Izzy',
        dashing: false,
        speed: 1,
        stamina: 1,
        rafromnk: 0,
        profilepic: 'horse3_profile'
      },
      {
        name: 'Dorian',
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