const minuteSeconds =  (segundos) =>{
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
  
    const minutosString = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const segundosString = segundosRestantes < 10 ? `0${segundosRestantes}` : `${segundosRestantes}`;
  
    return `${minutosString}:${segundosString}`;
}


export default minuteSeconds