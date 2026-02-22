Complete tier questions:

1. What did you build? Describe the feature in plain language.

Through a micro-iteration process using Claude Code for the Web, I prompted Claude to create a lightbox gallery feature for the "meet the cats" page on my Cat Cafe website. Essentially, this means when a user selects an image of any cat on the page, the selected image will increase in size and become centered on the page; At the same time, the background will dim and an exit button will appear in the corner of the image space. This allows the user to get a closer look at the cat without leaving the page.

2. How did micro-iteration feel? Was working in small steps natural or frustrating? Why?

In all honesty, it took a moment to get used to. Until this point I have had a habit of typing large prompts with Claude, and filled each one with as much detail as possible, thinking it might help Claude by putting everything all in at once. I can see now that it's actually more helpful to review iteratively. This would cut down on the code "bloat" I was experiencing in recent assignments.

At times it was frustrating, primarily because Claude would naturally start to work on the next tasks as it saw the connection. This would create issues where I would still want to test and Claude would be scooting right along to the next task. However this may have been a user error on my end because I was not completely feeling comfortable and confident with the chat and the "accept-auto-edits" vs "plan-mode" settings.

3. What did self-review catch? When you asked the AI to review its own code, what issues did it find? Give at least one specific example.

The self review prompt caused Claude to catch a few issues, and the very first one occurred in Part 1, where it caught an empty src=" " attribute. I misread this as Claude simply did not add the image src yet, so I asked if removing the src attribute would cause the image to break. Claude explained that the JavaScript would dynamically put the image in once the user selects it. Because #lightbox-img is simply a placeholder, the blank src should be deleted. This explanation was helpful.

Another issue that Claude caught in self review, was that a few of the cats on the page did not have classes attached. This would have caused the images to simply stay static when clicked, which creates a less than ideal experience.

4. Tool impressions. What did you like or dislike about [Copilot Agent / Claude Web]?

I disliked how disconnected it felt from the coding environment I'm used to. could be user error on my end, but I was not confident completely working in the Claude Web chat. I missed my bash terminal, and I disliked not being able to see all of my files in the file explorer and to edit and create files on my own without directing Claude Web to do it. When I work with Claude as a CLI, it feels more collaborative, and that I have more freedom to hop into the files and make my own updates or edits when needed. Again, this could have been an error on my part in how I set up Claude Web. I'm happy to improve on the process later, but this first time was a little rough.

I also disliked that it could not seem to provide answers on its own error. At multiple points after I interrupted one of its processes, it threw the error

"API Error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"messages.17.content.1: tool_use ids must be unique"},"request_id":"req_011CYNpaVXnv3XX2YVcpADMo"}".

I did not understand why this error was shown every time I typed a question, and it could not answer when I asked what caused the error.

5. Self-review patterns. Did the AI consistently catch certain types of issues during self-review (e.g., edge cases, missing error handling)? Did it ever miss something you caught yourself?

I found that Claude's self review was strong overall, but it commonly caught edge cases and accessibility concerns:
A good example of Claude catching an edge case was in Step 2, where it caught that on small screens, the exit button might be clipped by the viewport edge or by "overflow:hidden" on a parent.
And an example of Claude noticing an accessibility issue was how it caught <dialog> being placed outside of <footer>, which would potentially make it difficult for older assistive technologies to read.

A major issue that I caught through testing that Claude missed on its first round of revision and debugging, was that clicking an image would only show the previously selected image alongside the new image's name. For example if I clicked on "Whiskers" first and then clicked on "Luna", I would see an image of Whiskers by Luna's name.
A second instance, although I'm not sure if this would qualify as "Claude missing something", as it likely just needed me to prompt it, but Claude did not automatically center-align the images in the lightbox view. Originally they were placed in the extreme left, and the button would shift with the image as the screen resized. This was corrected on a second revision.

6 . Browser tool vs. CLI comparison. If you've used Claude Code CLI or another terminal tool, how did the browser-based experience compare? What's better/worse about each?
I personally preferred working with Claude Code CLI. Using the CLI felt as if I had more control over what files were being changed, and I felt I could easily dip in and out of the conversation and add any edits as needed without the need for a separate prompt. Using the CLI feels more like working alongside another developer, versus in the web version, it feels limited. Just prompting and waiting, then reading and prompting and waiting again, without really getting to see what's going on in the files. As I mentioned in the first half, this could be an issue with me simply not being familiar with the web version of Claude. Despite my complaints, I could see Claude Web being helpful if I needed to make updates to a project and I didn't have access to my personal laptop. I could simply connect a previous repo and go from there, without the need to install anything.

7. When would you use micro-iteration + self-review? For what kinds of tasks does this workflow make sense? When would you skip it?

I actually feel using self-review is beneficial at many stages of a project and for many tasks. Because Claude caught things to correct at nearly every step in this process, completing any of the steps without review would have caused more work and back-tracking later. Especially for a newer developer like me, it is extremely helpful to have an extra set of "eyes" looking out for those edge cases I likely wouldn't be prepared for right away, or those potential issues that could come up. It's nice to be prepared.
