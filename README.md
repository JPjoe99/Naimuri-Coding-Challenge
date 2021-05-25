# Naimuri Coding Challenge
My submission for the Naimuri coding challenge

The main goal of the challenge was to connect to the GitHub API to retrieve repositories based on filters that the user had selected, these being:-
- Main language used in the repositories
- Username
- Name of repository

Once the repositories have been retrieved, the application then outputs the key details of the repositories, these being:-
- Repository name
- Repository author
- Number of forks
- Number of stars
- Number of issues
- README of the repository

Possible improvements:

With this challenge, I took a purely functional approach in my solution, but in hindsight, I think a much better solution would have been obtained if I took an object-oriented approach, as I believe the code would be more manageable and scalable in comparison. Using an object-oriented approach would have also allowed me to better seperate functions/classes in seperate files, as another issue with my code is the fact that all of my functions are all located in the script.ts file, resulting in a file that is large and more difficult to read.

In terms of filters, more filters could be potentially added to the application, such as:-

- Number of forks
- Number of stars
- Number of issues

Another feature could be to also sort the repositories received by increasing/decreasing number in the parameters mentioned above.

In terms of the UI, this could be improved massively as I currently don't find it very visually apealling. The formatting of the README content could also be improved as the size of the README can negatively affect the UI, and repositories without README files cause the application to return a JSON response given by the GitHub API, stating that the file could not be found.

In terms of retrieving the README content of the repositories, the GitHub API has a limit on the number of requests made per hour, resulting in some repository README files not being displayed if this limit has been exceeded. Bypassing this limit would benefit the application, but I'm not entirely sure how this could be achieved.

[Click here to view!](https://jpjoe99.github.io/Naimuri-Coding-Challenge/)
