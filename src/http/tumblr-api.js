const URL = 'https://api.tumblr.com/v2/blog/montanamoment';
const KEY = '<KEY>';


const GET = async function(endpoint){
    const res = await fetch(`${URL}/${endpoint}?api_key=${KEY}`);
    if(res.ok){
        return res.json();
    }
    return null;
}

export {GET};