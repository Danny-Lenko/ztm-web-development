type Props = {
  name: string;
  entries: string;
};

export const Rank: React.FC<Props> = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">
        {`${name}, your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};
