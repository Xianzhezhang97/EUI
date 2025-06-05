import { cn } from '@/utils/cn';
import React, { useEffect, useRef, useState } from 'react';
import { Digit } from './components/Digit';
import { formatNumber } from './util/formatNumber';
import { parseFormattedNumber } from './util/parseFormattedNumber';
import { motion, useMotionValue, animate } from 'framer-motion';

export type NumberFormat = 'none' | 'currency' | 'percentage' | 'decimal';

export type NumberType = 'standard' | 'scientific' | 'engineering';

export type AnimationType = 'flip' | 'slide' | 'fade' | 'none';

interface AnimatedNumberProps {
  value: number | string;
  format?: NumberFormat;
  animation?: AnimationType;
  duration?: number;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  maxNumberPlaces?: number;
  delayPerChar?: number;
  currencyType?: string;
  useShortFormat?: boolean;
  numberType?: NumberType;
  currencySymbolSize?: string;
  integerPartSize?: string;
  decimalPartSize?: string;
  suffixSize?: string;
  commaWidth?: string;
  className?: string;
}

export const Number: React.FC<AnimatedNumberProps> = ({
  value,
  format = 'none',
  animation = 'slide',
  duration = 0.5,
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
  locale = 'en-US',
  maxNumberPlaces = 0,
  delayPerChar = 0.05,
  currencyType = 'USD',
  useShortFormat = false,
  numberType = 'standard',
  currencySymbolSize,
  integerPartSize,
  decimalPartSize,
  suffixSize,
  className,
  commaWidth = '0.4em',
  ...props
}) => {
  const [formattedParts, setFormattedParts] = useState({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    fullText: '',
  });
  const [prevFormattedParts, setPrevFormattedParts] = useState({
    currencySymbol: '',
    integerPart: '',
    decimalPart: '',
    fullText: '',
  });
  const [showDigits, setShowDigits] = useState(false);

  const animatedValue = useMotionValue(0);

  useEffect(() => {
    const numValue =
      typeof value === 'number' ? value : parseFloat(value.toString());
    if (isNaN(numValue)) return;

    setShowDigits(false); // 重置动画状态
    setPrevFormattedParts(formattedParts); // 保存上一次结果用于对比

    const controls = animate(animatedValue, numValue, {
      duration: duration,
      onUpdate: (latest) => {
        const formatted = formatNumber(
          latest,
          format,
          decimalPlaces,
          locale,
          currencyType,
          useShortFormat,
          numberType,
          maxNumberPlaces,
        );
        const parsed = parseFormattedNumber(formatted, format, currencyType);
        setFormattedParts({
          ...parsed,
          fullText: formatted,
        });
      },
      onComplete: () => {
        setShowDigits(true);
      },
    });

    return () => controls.stop(); // 清理动画控制器
  }, [
    value,
    format,
    decimalPlaces,
    currencyType,
    useShortFormat,
    numberType,
    maxNumberPlaces,
    duration,
  ]);

  const calculateDelay = (
    index: number,
    totalLength: number,
    changed: boolean,
  ) => {
    if (!changed || animation === 'none') return 0;
    const reverseIndex = totalLength - 1 - index;
    return reverseIndex * delayPerChar;
  };

  const renderPart = (
    text: string,
    prevText: string,
    partFontSize?: string,
  ) => {
    const chars = text.split('');
    const prevChars = prevText
      ? prevText.split('')
      : Array(chars.length).fill(' ');

    return chars.map((char, index) => {
      const prevChar = prevChars[index] || ' ';
      const changed = prevChar !== char && prevChar !== ' ';
      const delay = calculateDelay(index, chars.length, changed);

      return (
        <Digit
          key={`${index}-${char}`}
          value={char}
          prevValue={prevChar}
          animation={animation}
          duration={duration}
          delay={delay}
          fontSize={partFontSize}
          commaWidth={commaWidth}
          className={className}
          {...props}
        />
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className={cn('inline-flex items-end', className)}
      {...props}
    >
      {showDigits && (
        <>
          {prefix && (
            <span
              className='mr-1'
              dangerouslySetInnerHTML={{ __html: prefix }}
            />
          )}

          <div className='flex overflow-hidden items-baseline'>
            {formattedParts.currencySymbol && (
              <div
                className='flex'
                style={
                  currencySymbolSize ? { fontSize: currencySymbolSize } : {}
                }
              >
                {renderPart(
                  formattedParts.currencySymbol,
                  prevFormattedParts.currencySymbol,
                  currencySymbolSize,
                )}
              </div>
            )}

            <div
              className='flex'
              style={integerPartSize ? { fontSize: integerPartSize } : {}}
            >
              {renderPart(
                formattedParts.integerPart,
                prevFormattedParts.integerPart,
                integerPartSize,
              )}
            </div>

            {formattedParts.decimalPart && (
              <div
                className='flex'
                style={decimalPartSize ? { fontSize: decimalPartSize } : {}}
              >
                {renderPart(
                  formattedParts.decimalPart,
                  prevFormattedParts.decimalPart,
                  decimalPartSize,
                )}
              </div>
            )}
          </div>

          {suffix && (
            <span
              className='ml-1'
              style={suffixSize ? { fontSize: suffixSize } : {}}
              dangerouslySetInnerHTML={{ __html: suffix }}
            />
          )}
        </>
      )}
    </motion.div>
  );
};
