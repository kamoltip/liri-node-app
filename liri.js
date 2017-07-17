var key = require("./key.js");
var Twitter = require("twitter");
// console.log(key.twitterKey.consumer_key);

switch(process.argv[2]){
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotify();
        // console.log("You search for " + process.argv[3] + " but unfortunately, we don't do any query yet");
        break;
    case "movie-this":
        omdb();
        break;
    case "do-what-it-says":
        toggle();
        break;
    default:
        // console.log("Sorry, we did not find any match");
}

function omdb(){
var request = require("request");
var movieSearch = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=40e9cece";
// console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {
    console.log("----------------------------")
    console.log("///// " + JSON.parse(body).Title.toUpperCase() + " /////");
    console.log("----------------------------")
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value[1]);
    console.log("Production by: " + JSON.parse(body).Country);
    console.log("Language" + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }else if(process.argv[3] !== movieSearch){
    console.log("you can do this!");
  }
});
}

function spotify(){

  var Spotify = require('node-spotify-api');
  // console.log(key.spotifyKey.id);
  var spotify = new Spotify({
  id: key.spotifyKey.id,
  secret: key.spotifyKey.secret
  });

  spotify.search({ type:'track', query:process.argv[3] }, function(err, data) {


    if (err) {
    return console.log("'The Sign' by Ace of Base.");
  }

    console.log(JSON.stringify(data,null,2));

});
}

function twitter(){

  var twitterKey = key.twitterKey;
  var params = {screen_name: 'nodejs'};


      var client = new Twitter({
        consumer_key: twitterKey.consumer_key,
        consumer_secret: twitterKey.consumer_secret,
        access_token_key: twitterKey.access_token_key,
        access_token_secret: twitterKey.access_token_secret
      });
      var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', { screen_name: 'nodejs', count: 20 }, function(error, tweets, response) {
  if (!error && response.statusCode === 200) {

      for (var i = 0; i < tweets.length; i++) {
        console.log("---------------------------");
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }

  } else {
    console.log("Sorry, could not find what you are looking for");
  }
  });
};

function toggle(){
  var fs = require('fs');

  fs.readFile('random.txt', 'utf8', function(err,data){
    if (err){
      return console.log("Sorry, cannot find the data");
    }

    console.log(data);
  });
}
