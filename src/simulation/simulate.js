// For all of this, 0 stands for female, and 1 for male. It's not sexist,
// it was the other way around until I wanted to fit it with coraked
// you'll get it

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

// after processing croaks we add perceived sex of the frog, which is either male (0) or unknown (1)
export function process_croaks(frogs,cp){
  let {single, couple, croaked_single, croaked_couple} = frogs;
  if(single[0]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_single.push(0) ;
    }else{
      croaked_single.push(1);
    }
  }else{
    croaked_single.push(1);
  }
  if(couple[0]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_couple.push(0) ;
    }else{
      croaked_couple.push(1);
    }
  }else{
    croaked_couple.push(1);
  }
  if(couple[1]){
    // if the frog croaked
    if(random_binary(cp)){
      croaked_couple.push(0) ;
    }else{
      croaked_couple.push(1);
    }
  }else{
    croaked_couple.push(1);
  }
  return frogs;
}

export function check_spoilage(frogs){
  let {croaked_single, croaked_couple} = frogs;
  // if the single frog did croak, the set is spoiled
  if(croaked_single[0]){

  }
}

// cp stands for croak probability, the probability that a male would croak during the period of the puzzle
export function simulate(iters,fp,cp){
  let data = {
    spoiled: 0,
    couple_count: 0,
    single_count: 0
  }
  let {spoiled,single_count,couple_count} = data;

  for (let i=0;i<iters;i++){
    let frogs = generate_frogs(fp);
    frogs = process_croaks(frogs,cp);
    frogs = check_spoilage(frogs);

  }
}
