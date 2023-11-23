from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import pickle
import uvicorn
import requests
from os import getenv
import numpy as np
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


movies_df = pd.DataFrame(pickle.load(open("D:\FastApi\\practice\\movies_dataframe.pkl","rb")))
movie_similarity = pickle.load(open("D:\FastApi\\practice\\movies_similarity_model.pkl","rb"))

def fetch_poster(movie_id):
   url = "https://api.themoviedb.org/3/movie/{}?api_key=(Your Api Key)&language=en-US".format(movie_id)
   data = requests.get(url)
   data = data.json()
   try:
      poster_path = data['poster_path']
   except:
      return "https://www.filmfodder.com/reviews/images/poster-not-available.jpg"
   if(poster_path==None):
      return "https://www.filmfodder.com/reviews/images/poster-not-available.jpg"
   else:
      return "https://image.tmdb.org/t/p/w500"+poster_path
       

@app.get("/")
async def index():
   movies_df.head()
   return {"message": "Welcome To Movie Recommendation Api"}

@app.get("/movie_title")
def title():
   x  = movies_df['original_title'].values.tolist()
   l = []
   for i in x:
      temp_dict = {}
      temp_dict['value'] = i
      temp_dict['label'] = i

      l.append(temp_dict)
   return {
      # "title":movies_df['original_title'].values.tolist()
      "title":l
   }

@app.get("/recommend-movie/{movie_title}")
def recommend_movie(movie_title):
   movie_index = movies_df[movies_df['original_title']==movie_title].index[0]
   similar_movies_list = sorted(list(enumerate(movie_similarity[movie_index])),reverse=True,key = lambda x: x[1])[1:6]
   
   movie_list = []
   index = 1
   for i in similar_movies_list:
      movies_dict  = {
        "imdb_id":movies_df.iloc[i[0]].imdb_id,
        "movie_name":movies_df.iloc[i[0]].original_title,
        "poster_path":fetch_poster(movies_df.iloc[i[0]].imdb_id)
      }
      # temp_list = [movies_df.iloc[i[0]].imdb_id,movies_df.iloc[i[0]].original_title,fetch_poster(movies_df.iloc[i[0]].imdb_id)]
      movie_list.append(movies_dict)

      # index += 1
   return {
      "recommendation" : movie_list
   }

@app.get("/movie_title_poster_path")
def titlePath():

   movie_object_list = []

   for i in range(28):
      movie_d = {}
      movie_d['original_title'] = movies_df['original_title'][i]
      movie_d['imdb_id'] = movies_df['imdb_id'][i]
      movie_d['poster_path'] = fetch_poster(movies_df['imdb_id'][i])
      movie_object_list.append(movie_d)

   return {
      "movie_list":movie_object_list
   }


if __name__ == "__main__":
   port = int(getenv("PORT",3000))
   uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
