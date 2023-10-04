import { classSet, JSX, moment, renderMarkdown } from "../src.deps.ts";

export type ChatBoxProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, "icon"> & {
  color: string;

  content: string;

  icon: JSX.Element;

  justifyEnd?: boolean;

  timestamp: Date;
};

export function ChatBox(props: ChatBoxProps) {
  const contentMdx = renderMarkdown(props.content);

  return (
    <>
      <div
        class={classSet(
          props,
          "flex w-full mt-2 mx-3",
          props.justifyEnd ? "ml-auto justify-end" : undefined,
        )}
      >
        <div
          class={classSet(
            undefined,
            "flex flex-col",
            props.justifyEnd ? "order-1" : "order-2",
          )}
        >
          <div
            class={classSet(
              undefined,
              `bg-${props.color}-600 border-${props.color}-500`,
              "bg-opacity-10 border border-opacity-40 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg overflow-auto p-3 rounded-l-lg rounded-br-lg",
            )}
          >
            <p
              class="text-sm [&_pre]:bg-gray-200 dark:[&_pre]:bg-gray-900 [&_pre]:text-grey-800 dark:[&_pre]:text-white [&_pre]:m-2 [&_pre]:p-2 [&_pre]:rounded-md [&_pre]:overflow-auto"
              dangerouslySetInnerHTML={{ __html: contentMdx }}
            >
            </p>
          </div>

          <span class="text-xs text-gray-500 leading-none">
            {moment(props.timestamp).from()}
          </span>
        </div>

        <div
          class={classSet(
            undefined,
            `bg-${props.color}-600 border-${props.color}-500 text-${props.color}-600`,
            "flex flex-shrink-0 h-6 w-6 md:h-10 md:w-10 justify-center rounded-full bg-opacity-10 border border-opacity-40 overflow-clip",
            props.justifyEnd ? "order-2 ml-2" : "order-1 mr-2",
          )}
        >
          <div class="flex self-center">
            {props.icon}
          </div>
        </div>
      </div>
    </>
  );
}
