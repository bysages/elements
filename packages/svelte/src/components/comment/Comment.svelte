<script lang="ts">
import type { CommentProps } from "./props";

let { author, datetime, avatar, actions, children, ...rest }: CommentProps = $props();
</script>

<!-- A voice on the record: the portrait hangs left (the avatar
snippet), the body carries the byline from `author` and `datetime`, the
ink is the children snippet, and the actions snippet is the row of
answers. -->
<article {...rest} data-scope="comment" data-part="root">
  {#if avatar}
    <div data-scope="comment" data-part="avatar">{@render avatar()}</div>
  {/if}
  <div data-scope="comment" data-part="body">
    {#if author || datetime}
      <header data-scope="comment" data-part="header">
        {#if author}
          <span data-scope="comment" data-part="author">{author}</span>
        {/if}
        {#if datetime}
          <time data-scope="comment" data-part="datetime" datetime={datetime}>{datetime}</time>
        {/if}
      </header>
    {/if}
    <div data-scope="comment" data-part="content">
      {@render children?.()}
    </div>
    {#if actions}
      <div data-scope="comment" data-part="actions">{@render actions()}</div>
    {/if}
  </div>
</article>
