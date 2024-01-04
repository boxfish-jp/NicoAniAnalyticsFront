const BigBadge = ({ className }: { className?: string }) => {
  return (
    <div className={"bg-black px-5 rounded-lg " + className}>
      <p className="text-white text-2xl font-medium">10000</p>
      <p className="text-white">再生数</p>
    </div>
  );
};

export default BigBadge;
