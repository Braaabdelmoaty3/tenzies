export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
    boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
  };

  return (
    <div
      className="w-[50px] h-[50px] rounded-[4px] flex items-center justify-center font-bold text-[22px] font-karla cursor-pointer"
      style={styles}
      onClick={() => props.hold(props.id)}
    >
      {props.value}
    </div>
  );
}
