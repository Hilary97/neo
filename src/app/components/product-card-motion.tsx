"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { ProductBadge } from "./product-badge";
import { ProductCTA } from "./product-cta";
import type { Product } from "@/lib/products";

gsap.registerPlugin(useGSAP);

interface ProductCardMotionProps {
  product: Product;
  index?: number;
}

export function ProductCardMotion({ product, index = 0 }: ProductCardMotionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const hasSecondImage = product.images.length > 1;
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  useGSAP(
    () => {
      const root = rootRef.current;
      const surface = surfaceRef.current;
      const image = imageRef.current;

      if (!root || !surface) {
        return;
      }

      const mm = gsap.matchMedia(root);

      mm.add(
        {
          canAnimate: "(prefers-reduced-motion: no-preference)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { canAnimate, finePointer, reduceMotion } = context.conditions ?? {};
          const cleanup: Array<() => void> = [];
          let observer: IntersectionObserver | undefined;
          let revealTween: gsap.core.Tween | undefined;

          const hasFocusWithin = () => root.matches(":focus-within");

          const killReveal = () => {
            revealTween?.kill();
            revealTween = undefined;
            observer?.disconnect();
            observer = undefined;
          };

          const settleVisible = context.add("settleVisible", () => {
            killReveal();
            gsap.killTweensOf(root);
            gsap.set(root, { autoAlpha: 1, y: 0, clearProps: "visibility" });
          }) as () => void;

          const resetVisualsNow = () => {
            gsap.killTweensOf(surface);
            gsap.set(surface, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              y: 0,
              transformPerspective: 900,
              transformOrigin: "50% 50%",
            });

            if (image) {
              gsap.killTweensOf(image);
              gsap.set(image, { scale: 1 });
            }
          };

          const resetCard = () => {
            resetVisualsNow();
            setImgIndex(0);
          };

          gsap.set(root, { autoAlpha: 1, y: 0 });
          resetVisualsNow();

          const revealOnFocus = context.add("revealOnFocus", () => {
            settleVisible();
            resetCard();
          }) as () => void;

          root.addEventListener("focusin", revealOnFocus);
          cleanup.push(() => root.removeEventListener("focusin", revealOnFocus));

          if (reduceMotion) {
            settleVisible();
            setImgIndex(0);
            return () => {
              cleanup.forEach((clean) => clean());
            };
          }

          if (canAnimate) {
            const reveal = context.add("reveal", () => {
              if (hasFocusWithin()) {
                settleVisible();
                return;
              }

              revealTween?.kill();
              revealTween = gsap.fromTo(
                root,
                { autoAlpha: 0, y: 18 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.48,
                  delay: Math.min(index, 6) * 0.055,
                  ease: "power2.out",
                  overwrite: true,
                  clearProps: "visibility",
                },
              );
            }) as () => void;

            if (hasFocusWithin()) {
              settleVisible();
            } else if ("IntersectionObserver" in window) {
              observer = new IntersectionObserver(
                ([entry]) => {
                  if (entry?.isIntersecting) {
                    reveal();
                    observer?.disconnect();
                    observer = undefined;
                  }
                },
                { rootMargin: "0px 0px -8% 0px", threshold: 0.16 },
              );

              observer.observe(root);
              cleanup.push(() => observer?.disconnect());
            } else {
              reveal();
            }
          }

          if (finePointer && !reduceMotion) {
            const rotateXTo = gsap.quickTo(surface, "rotateX", {
              duration: 0.35,
              ease: "power2.out",
            });
            const rotateYTo = gsap.quickTo(surface, "rotateY", {
              duration: 0.35,
              ease: "power2.out",
            });
            const liftTo = gsap.quickTo(surface, "y", {
              duration: 0.28,
              ease: "power2.out",
            });
            const scaleTo = gsap.quickTo(surface, "scale", {
              duration: 0.28,
              ease: "power2.out",
            });
            const imageScaleTo = image
              ? gsap.quickTo(image, "scale", {
                  duration: 0.45,
                  ease: "power2.out",
                })
              : undefined;

            const resetTransforms = () => {
              rotateXTo(0);
              rotateYTo(0);
              liftTo(0);
              scaleTo(1);
              imageScaleTo?.(1);
            };

            const resetHover = () => {
              resetTransforms();
              setImgIndex(0);
            };

            const handlePointerEnter = context.add(
              "handlePointerEnter",
              (event: PointerEvent) => {
                if (event.pointerType !== "mouse" || hasFocusWithin()) {
                  resetCard();
                  return;
                }

                liftTo(-4);
                scaleTo(1.012);
                imageScaleTo?.(1.035);
                if (hasSecondImage) {
                  setImgIndex(1);
                }
              },
            ) as (event: PointerEvent) => void;

            const handlePointerMove = context.add(
              "handlePointerMove",
              (event: PointerEvent) => {
                if (event.pointerType !== "mouse" || hasFocusWithin()) {
                  resetCard();
                  return;
                }

                const rect = root.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;

                rotateXTo(gsap.utils.clamp(-3, 3, y * -5));
                rotateYTo(gsap.utils.clamp(-3, 3, x * 5));
              },
            ) as (event: PointerEvent) => void;

            const handlePointerLeave = context.add("handlePointerLeave", resetHover) as () => void;
            const handlePointerCancel = context.add(
              "handlePointerCancel",
              (event: PointerEvent) => {
                if (event.pointerType !== "mouse") {
                  resetCard();
                  return;
                }

                resetHover();
              },
            ) as (event: PointerEvent) => void;

            const handleFocusOut = context.add(
              "handleFocusOut",
              (event: FocusEvent) => {
                if (event.relatedTarget instanceof Node && root.contains(event.relatedTarget)) {
                  return;
                }

                resetCard();
              },
            ) as (event: FocusEvent) => void;

            root.addEventListener("pointerenter", handlePointerEnter);
            root.addEventListener("pointermove", handlePointerMove);
            root.addEventListener("pointerleave", handlePointerLeave);
            root.addEventListener("pointercancel", handlePointerCancel);
            root.addEventListener("focusout", handleFocusOut);

            cleanup.push(() => {
              root.removeEventListener("pointerenter", handlePointerEnter);
              root.removeEventListener("pointermove", handlePointerMove);
              root.removeEventListener("pointerleave", handlePointerLeave);
              root.removeEventListener("pointercancel", handlePointerCancel);
              root.removeEventListener("focusout", handleFocusOut);
              resetCard();
            });
          }

          return () => {
            killReveal();
            cleanup.forEach((clean) => clean());
          };
        },
      );

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <article ref={rootRef} className="opacity-100">
      <div ref={surfaceRef} className="group flex flex-col gap-3">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100">
          <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0">
            <Image
              ref={imageRef}
              src={product.images[imgIndex]}
              alt={product.title}
              fill
              className="object-cover motion-reduce:transition-none"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="pointer-events-none absolute right-2 top-2 z-10 flex flex-col gap-1.5">
              {product.badges.map((badge) => (
                <ProductBadge
                  key={`${badge.label}-${badge.variant}`}
                  label={badge.label}
                  variant={badge.variant}
                />
              ))}
            </div>
          )}

          {/* Color Swatches on Image */}
          {product.colors.length > 0 && (
            <div className="absolute bottom-3 left-3 z-10 flex gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className="h-5 w-5 rounded-full border-2 border-white shadow-sm transition-transform motion-reduce:transition-none motion-safe:md:hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 px-1">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="text-amber-400">
              {"★".repeat(Math.round(product.rating))}
            </span>
            <span className="text-zinc-400">({product.reviewCount})</span>
          </div>

          {/* Title */}
          <h3 className="font-condensed text-lg font-semibold uppercase leading-tight tracking-wide">
            <Link href={`/products/${product.slug}`} className="hover:underline">
              {product.title}
            </Link>
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-xl font-bold">
              ${product.price.toLocaleString("es-MX")} MXN
            </span>
            {hasDiscount && (
              <span className="text-sm text-zinc-400 line-through">
                ${product.originalPrice!.toLocaleString("es-MX")} MXN
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="mt-1 flex items-center gap-1">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  className="h-4 w-4 rounded-full border border-zinc-300"
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                />
              ))}
            </div>
          )}

          <ProductCTA product={product} className="mt-2" />
        </div>
      </div>
    </article>
  );
}
