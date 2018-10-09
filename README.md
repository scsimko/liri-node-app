LIRI Bot:

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

To Use LIRI, you would need to clone this repository and enter a Spotify API Key. Your Spotify API Key must be entered in a file named: .evn and read like the:
                   
Spotify API keys

SPOTIFY_ID=
SPOTIFY_SECRET=


Once this is complete, you can access the file by typing: node liri.js in the command line of your terminal. 

The next prompt will have you select what you would like to do:

? actionItem: (Use arrow keys)

❯ concert-this

  spotify-this-song

  movie-this
  
  do-what-it-says


After you make your selection. You will be asked to enter “What Band?”, “Which Song?”, or “Which Movie?”. Once you input your data in the command line Liri will provide you results from the following sites:

http://www.omdbapi.com/

https://www.bandsintown.com/

https://www.spotify.com/

If you select “do-what-it-says”, your results will based on the entry in the random.txt file in the repository. 
