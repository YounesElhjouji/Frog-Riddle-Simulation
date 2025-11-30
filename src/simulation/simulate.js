// For all of this, 0 stands for female, and 1 for male. It's not sexist,
// it was the other way around until I wanted to fit it with coraked
// you'll get it

// NOTE TO FUTURE SELF: better modeling of croaking probability if time isn't included it's kinda bullshit

export function random(a,b,isInt=1){
  let rand;
  if(isInt===1){
    rand = a + Math.floor(Math.random() * b);
  }else{
    rand = a + Math.random() * b;
  }
  return rand
}

// p: probability of 1
export function random_binary(p){
  let rand = Math.random();
  if (rand<p){
    return 0;
  }
  return 1;
}


// To test whether this random_binary() is fucking with me
export function test(iters,fp){
  let count = 0;
  for (let i=0;i<iters;i++){
    if(random_binary(fp)){
      count++;
    }
  }
  console.log(count/iters);
}


// fp stands for female percentage, the percentage of frogs that are female. For if my code gets read by anyone, ever.. :'(
// I feel like typing .. followed by :'( is kinda redundant
export function generate_frogs(fp){
  let frogs = {
    single: [],
    couple: [],
    croaked_single: [],
    croaked_couple: [],
    spoiled: 0
  }
  let {single, couple} = frogs;
  single.push(random_binary(fp));
  couple.push(random_binary(fp));
  couple.push(random_binary(fp));
  //console.log(frogs);
  return frogs;
}

// after processing croaks we add perceived sex of the frog, which is either male (1) or unknown (0)
export function process_croaks(frogs,cp){
  let {single, couple, croaked_single, croaked_couple} = frogs;
  if(single[0]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_single.push(1) ;
    }else{
      croaked_single.push(0);
    }
  }else{
    croaked_single.push(0);
  }
  if(couple[0]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_couple.push(1) ;
    }else{
      croaked_couple.push(0);
    }
  }else{
    croaked_couple.push(0);
  }
  if(couple[1]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_couple.push(1) ;
    }else{
      croaked_couple.push(0);
    }
  }else{
    croaked_couple.push(0);
  }
  return frogs;
}

export function check_spoilage(frogs){
  let {croaked_single, croaked_couple} = frogs;
  // if the single frog did croak, the set is spoiled
  if(croaked_single[0]){
    frogs.spoiled = 1;
    return frogs;
  }
  frogs.spoiled = 1;
  if(croaked_couple[0]+croaked_couple[1]===1){
    frogs.spoiled = 0;
  }
  return frogs;
}

export function round(fp,cp){
  let frogs = generate_frogs(fp);
  frogs = process_croaks(frogs,cp);
  frogs = check_spoilage(frogs);
  return frogs;
}

export function sam_survives(frogs){
  return !frogs.single[0];
}

export function chris_survives(frogs){
  return !frogs.couple[0] || !frogs.couple[1];
}

// cp stands for croak probability, the probability that a male would croak during the period of the puzzle
export function simulate(iters,fp=0.5,cp=0.5){
  /*
  Sam goes for the single frog
  Chris goes for the two frogs
  */
  let spoiled = 0;
  let sam_count = 0; 
  let chris_count = 0;
  for (let i=0;i<iters;i++){
    let frogs = round(fp,cp);
    if(spoiled){
      spoiled++;
      continue;
    }
    sam_count+= sam_survives(frogs);      
    chris_count+= chris_survives(frogs);
  }
  console.log("Sam's chances: "+sam_count/(iters-spoiled));
  console.log("Chris' chances: "+chris_count/(iters-spoiled));
}
