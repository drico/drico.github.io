type IconFontSize = 'normal' | 'big';

const fontSizeMap: Record<IconFontSize, number> = { normal: 14, big: 20 };

const Icon = ({
  name,
  size = 'normal',
  className = '',
}: {
  name: string;
  size?: IconFontSize;
  className?: string;
}) => {
  return (
    <span
      className={'material-symbols-outlined ' + className}
      style={{ fontSize: fontSizeMap[size] }}
    >
      {name}
    </span>
  );
};

export default Icon;
