import Title from "components/micro/title";
import { useMovies } from "hooks/useMovies";
import { MovieProps } from "lib/interfaces";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
  const [page, setPage] = useState(1);
  return (
    <div>
      <Title text="Top Movies" />
      <MovieList page={page} />
    </div>
  );
}

const MovieList = ({ page }: { page: number }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useMovies(page);

  return (
    <InfiniteScroll
      className="px-1"
      dataLength={data?.pages.length || 10}
      next={fetchNextPage}
      hasMore={hasNextPage || true}
      loader={<MovieSkeleton />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data?.pages.map((initPage) => (
        <div key={initPage} className="movie-list scale-in">
          {initPage.map((movie: MovieProps) => (
            <MovieCard key={movie.title} {...movie} />
          ))}
        </div>
      ))}
    </InfiniteScroll>
  );
};

const MovieCard = (movie: MovieProps) => (
  <Link href={`/movies/${movie.id}`} className="movie-card">
    <div className="imdb">{movie.imdb_rating}</div>
    <div className="poster">
      <Poster alt={movie.title} src={movie.poster} />
      <div className="title">
        <h2>{movie.title}</h2>
      </div>
    </div>
    <div className="genres">
      {movie.genres.map((item, i) => (
        <div key={i} className="item">
          {item}
        </div>
      ))}
    </div>
  </Link>
);

const MovieSkeleton = () => (
  <div className="movie-list scale-in">
    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
      <div key={item} className="movie-skeleton">
        <div style={{ width: 212, height: 320 }} className="poster"></div>
        <div className="title"></div>
        <div className="genres">
          <div></div>
          <div></div>
        </div>
      </div>
    ))}
  </div>
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
