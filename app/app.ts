/**
 * 设置应用，在指定的容器元素中创建一个计数器按钮。
 * @param container - 用于容纳按钮的HTML元素。
 */
export function setupApp(container: HTMLElement) {
  const button = document.createElement("button");
  button.type = "button";

  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    button.innerHTML = `Count is ${counter}`;
  };

  button.addEventListener("click", () => setCounter(counter + 1));
  setCounter(0);

  container.appendChild(button);
}
