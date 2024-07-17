import { useRef } from "preact/hooks";
import {
  Action,
  classSet,
  ComponentChildren,
  Input,
  JSX,
} from "../src.deps.ts";

export type ChatInputProps =
  & Omit<
    JSX.HTMLAttributes<HTMLFormElement>,
    "icon"
  >
  & {
    children: ComponentChildren;

    icon?: ComponentChildren;

    placeholder?: string;

    hideOpenChat?: boolean;

    useOpenChat?: boolean;
  };

export function ChatInput(props: ChatInputProps) {
  const chatInputRef = useRef<HTMLFormElement>(null);

  props.id = props.id || "chat-input";

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const formEl: HTMLFormElement = document.querySelector(`#${props.id}`)!;

      formEl.submit();
    }
  };

  const scrollIntoView = () => {
    setTimeout(() => {
      if (chatInputRef?.current) {
        chatInputRef?.current?.scrollIntoView();
      } else {
        scrollIntoView();
      }
    }, 0);
  };

  scrollIntoView();

  return (
    <form
      method="post"
      ref={chatInputRef}
      {...(props as JSX.HTMLAttributes<HTMLFormElement>)}
      class={classSet(
        [
          "-:my-3 -:rounded-md -:p-3 -:bg-blue-600 -:bg-opacity-10 -:border -:border-blue-500 -:border-opacity-40",
        ],
        props,
      )}
    >
      <div class="relative z-0 flex flex-col md:flex-row">
        <Input
          multiline={true}
          name="content"
          class="block w-full rounded-sm rounded-r-none border-gray-300 text-sm shadow-sm focus:z-10 dark:bg-slate-950 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 text-black"
          placeholder={props.placeholder ||
            "Ask Thinky... (Shift + Enter for a new line)"}
          onKeyDown={handleKeyDown}
        />

        <Action
          type="submit"
          for="version"
          class="flex items-center space-x-1 rounded-sm rounded-l-none border border-l-0 border-blue-600 bg-blue-600 px-3 py-1.5 text-center text-xs font-medium text-white shadow-sm transition-all hover:border-blue-800 hover:bg-blue-800 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
        >
          {props.icon || props.children}
        </Action>
      </div>

      {!props.hideOpenChat && (
        <div class="mt-2">
          <label class="inline-flex items-center">
            <Input
              type="checkbox"
              name="useOpenChat"
              class="form-checkbox h-4 w-4 text-blue-600"
              checked={props.useOpenChat}
            />

            <span class="ml-2 text-gray-500">Use Open Chat</span>
          </label>
        </div>
      )}
    </form>
  );
}
