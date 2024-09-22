import React, { Suspense, useState, useEffect, useRef } from "react";
import "./listPage.css";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ErrorComponent from "../../components/errorComponent/ErrorComponent";
import NoData from "../../components/noData/NoData";
import CardSkeleton from "../../components/cardSkeleton/CardSkeleton";

const ListPage = () => {
  const posts = useLoaderData();
  const [searchParams] = useSearchParams();
  const [totalPost, setTotalPost] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const initialQuery = {
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
    maxWorkingDays: searchParams.get("maxWorkingDays") || "100",
    minSalary: searchParams.get("minSalary") || "0",
    limit: searchParams.get("limit") || "5",
  };

  const [query, setQuery] = useState(initialQuery);

  const loadMore = async () => {
    setIsLoadingMore(true);
    setQuery((prevQuery) => ({
      ...prevQuery,
      limit: (Number(prevQuery.limit) || 0) + 5,
    }));
  };

  // Ref for the "Load More" button
  const loadMoreButtonRef = useRef(null);

  // Set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            totalPost >= query.limit &&
            !isLoadingMore
          ) {
            loadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: "150px",
        threshold: 0.1,
      }
    );

    const button = loadMoreButtonRef.current;
    if (button) {
      observer.observe(button);
    }

    return () => {
      if (button) {
        observer.unobserve(button);
      }
    };
  }, [query.limit, totalPost, isLoadingMore]);

  const handlePostResponse = (postResponse) => {
    const postData = postResponse.data.postData;
    if (totalPost !== postData.length) {
      setTotalPost(postData.length);
      setIsLoadingMore(false);
    }
    console.log(postResponse.data);
    if (postData.length > 0) {
      return postData.map((post) => <Card item={post} key={post.postId} />);
    } else {
      setTotalPost(0);
      setIsLoadingMore(false);
      return (
        <NoData
          heading={"No jobs found"}
          text={"No jobs found. Please use the filter to find suitable jobs."}
        />
      );
    }
  };

  

  return (
    <div className="listPage">
      <h1 className="title-text text-uppercase">Jobs</h1>
      <div className="cards mb-5">
        <Filter query={query} setQuery={setQuery} />
        <Suspense
          fallback={
            <div>
              <CardSkeleton NoOfCards={8} />
            </div>
          }
        >
          <Await
            resolve={posts.postResponse}
            errorElement={
              <div>
                <ErrorComponent />
              </div>
            }
          >
            {handlePostResponse}
          </Await>
          <div
            ref={loadMoreButtonRef}
            className={`btn text-light mt-3 d-flex fs-5 justify-content-center mx-1`}
            onClick={loadMore}
          >
            {isLoadingMore ? (
              <span className="blink">Loading more jobs...</span>
            ) : totalPost > 0 ? (
              <span className="no-more-jobs">No more jobs!</span>
            ) : (
              ""
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
