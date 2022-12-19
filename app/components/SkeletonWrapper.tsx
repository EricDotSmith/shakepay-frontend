"use client";

import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";

const SkeletonWrapper: React.FC<SkeletonProps> = (props) => {
  return <Skeleton {...props} />;
};

export default SkeletonWrapper;
