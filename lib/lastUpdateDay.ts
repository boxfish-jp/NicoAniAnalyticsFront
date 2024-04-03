const lastUpdateDay = (syear: number, sseason: number) => {
  switch (sseason) {
    case 1:
      return new Date(`${syear}-03-30 16:30:00`);
    case 2:
      return new Date(`${syear}-06-29 16:30:00`);
    case 3:
      return new Date(`${syear}-09-29 16:30:00`);
    case 4:
      return new Date(`${syear}-12-30 16:30:00`);
    default:
      throw new Error("Invalid season");
  }
};

export default lastUpdateDay;
