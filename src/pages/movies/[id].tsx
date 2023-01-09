import Image from "next/image";
import { useState } from "react";
import Icon from "components/micro/icon";
import { useMovie } from "hooks/useMovies";
import { MovieProps } from "lib/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MoviePage({
  params,
}: {
  params: { id: number | string };
}) {
  const { data, isLoading } = useMovie(params.id);

  if (isLoading) return <p>Loading...</p>;

  return <Movie {...data} />;
}

const Movie = (movie: any) => (
  <>
    <div className="single-movie">
      <Poster alt={movie.title} src={movie.poster} />
      <div>
        <h1>{movie.title}</h1>
        <ul className="items">
          <li>
            <Icon name="schedule" size={20} />
            <span>
              Runtime: <span className="text-heading">{movie.runtime}</span>
            </span>
          </li>
          <li>
            <Icon name="public" size={20} />
            <span>
              Released: <span className="text-heading">{movie.released}</span>
            </span>
          </li>
          <li>
            <Icon name="recent_patient" size={20} />
            <span>
              Director: <span className="text-heading">{movie.director}</span>
            </span>
          </li>
          <li>
            <Icon name="bolt" size={20} />
            <span>
              Meta Score:{" "}
              <span className="text-heading">{movie.metascore}</span>
            </span>
          </li>
          <li>
            <Icon name="verified" size={20} />
            <span>
              Votes: <span className="text-heading">{movie.imdb_votes}</span>
            </span>
          </li>
          <li>
            <Icon name="group" size={20} />
            <span>
              Actors: <span className="text-heading">{movie.actors}</span>
            </span>
          </li>
        </ul>
        <div className="genres">
          {movie.genres.map((item: any, i: any) => (
            <div key={i} className="item">
              #{item}
            </div>
          ))}
        </div>
        <p className="description">{movie.plot}</p>
      </div>
    </div>
    <Swiper className="thumbails" spaceBetween={20} slidesPerView={3} loop>
      {movie.images &&
        movie.images.length &&
        movie.images.map((thumbail: any) => (
          <SwiperSlide key={thumbail} className="py-4 -mt-3">
            <Thumbail src={thumbail} alt={movie.title} />
          </SwiperSlide>
        ))}
    </Swiper>
  </>
);

interface PosterProps {
  src: string;
  alt: string;
}

const Poster = ({ src, alt }: PosterProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Image
        alt={alt}
        src={src}
        width={212}
        height={320}
        className={loaded ? "unblur" : ""}
        onLoadingComplete={() => setLoaded(true)}
      />
      <style jsx global>{`
        .unblur {
          animation: unblur 0.3s linear;
        }

        @keyframes unblur {
          from {
            filter: blur(20px);
          }
          to {
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
};

const Thumbail = ({ src, alt }: PosterProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Image
        alt={alt}
        src={src}
        width={245}
        height={103}
        className={loaded ? "unblur" : ""}
        onLoadingComplete={() => setLoaded(true)}
      />
      <style jsx global>{`
        .unblur {
          animation: unblur 0.5s linear;
        }

        @keyframes unblur {
          from {
            filter: blur(20px);
          }
          to {
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
};

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  };
}
