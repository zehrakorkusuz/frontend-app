import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { getToken } from "../functions/localstorage";

export default function Dashboard() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["content_data"],
    queryFn: () =>
      fetch("https://facade-service-7x5inv6roa-lz.a.run.app/api/content", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return data.map((c) => (
    <p key={c._id}>
      <Link to={c._id}>{c.title}</Link>
    </p>
  ));
}