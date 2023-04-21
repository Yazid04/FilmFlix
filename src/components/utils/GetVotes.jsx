const GetVotes = (vote_average) => {
  const toStr = vote_average?.toString()?.replace(/\./g, "")
      if (toStr[0] === 0) return "NR";
      if (toStr?.length === 1) return `${toStr[0]}0%`;
      if (toStr?.length === 2) return Math.round(`${toStr[0]}${toStr[1]}`) + "%";
      return Math.round(`${toStr[0]}${toStr[1]}.${toStr[2]}`) + "%";
}

export default GetVotes;
