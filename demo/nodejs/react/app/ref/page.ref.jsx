
export default function Counter() {
  console.log('page ref function');
  let ref = React.useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert(AcroML.utils.format(t('you clicked {0} times.'),ref.current));
  }

  return (
    <button onClick={handleClick}>
      {t('Click me')}{ref.current}
    </button>
  );
}
