// src/components/SmartImage.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { ImagePro } from "./ImagePro";

const meta: Meta<typeof ImagePro> = {
  title: "Components/Image",
  component: ImagePro,
  tags: ["autodocs"],
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    lazy: { control: "boolean" },
    withSkeleton: { control: "boolean" },
    showProgress: { control: "boolean" },
    placeholder: { control: "text" },
    fallback: { control: "text" },
    },
  
  decorators: [
    (Story) => (
      <div className=" items-center flex w-full h-full">
                <Story />

      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Image>;

const demoImage = "https://picsum.photos/1920/1080";
const brokenImage = "https://not-exist-domain.com/image.jpg";
const blurPlaceholder = "https://picsum.photos/id/10/10?blur";

export const Default: Story = {
  args: {
    src: demoImage,
    alt: "正常图片",
    width: "100%",
    height: "100%",
    lazy: false,
    withSkeleton: true,
    showProgress: false,
    rounded: true,
  },
};

export const WithSkeletonAndLazy: Story = {
  args: {
    src: demoImage,
    alt: "懒加载 + 骨架屏",
    width: "100%",
    height: "100%",
    lazy: true,
    withSkeleton: true,
    showProgress: false,
    rounded: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    src: demoImage,
    alt: "模糊占位图",
    width: "100%",
    height: "100%",
    lazy: true,
    withSkeleton: false,
    placeholder: blurPlaceholder,
    rounded: true,
  },
};

export const WithFallbackImage: Story = {
  args: {
    src: brokenImage,
    alt: "加载失败图",
    width:  "100%",
    height: "100%",
    rounded: true,
    fallback: "/fallback.png",
  },
};

export const WithProgressBar: Story = {
  args: {
    src: demoImage,
    alt: "加载进度条",
    width: "100%",
    height: "100%",
    rounded: true,
    showProgress: true,
    withSkeleton: false,
  },
};
