# Quizeo
Quizeo is a video teaching tool with the main goal to provide a more interactive experience for both the viewers and content creators. 
Instructors can upload videos and add quizes/surveys during their video for viewers to test their comprehension of the material. This data is then available to the video creator through their profile page. The quiz results will help viewers know how well they were able to learn the subject and they will help the instructors know how effective their lesson was.

# User Stories

the two main users of Quizeo will be career professionals looking for a platform to create lessons and users who are simply interested in learning or strengthening their grasp of a subject.

1) As a career profesional, I would like to create lessons.
2) As a career professional, I would like to be able to get feedback on my lessons.
3) As a career professional, I would like to update my lessons to improve their effectiveness.
4) As a career professional, I would like to be able to delete ineffective or out of date lessons.

1) As a student, I would like to search for lessons or topics that I am interested in.
2) As a student, I would like to be able to view specific lessons.
3) As a student, I would like to be able to leave feedback for the lessons that I have viewed.

## ERD

![quiz_erd](https://user-images.githubusercontent.com/26421398/45004273-54201780-afb9-11e8-88db-30b4f49a2862.png)

# Wireframes

![wireframe 1](https://user-images.githubusercontent.com/26421398/45008972-99e9d980-afd3-11e8-9870-75020a438c9a.png)
![wireframe 2](https://user-images.githubusercontent.com/26421398/45008980-a40bd800-afd3-11e8-84c2-f7f1f2cc461e.png)
![wireframe 3](https://user-images.githubusercontent.com/26421398/45008989-aff79a00-afd3-11e8-9cfe-e289bc356164.png)
![wireframe 4](https://user-images.githubusercontent.com/26421398/45008998-b554e480-afd3-11e8-9d45-a13b673e1a49.png)
![wireframe 5](https://user-images.githubusercontent.com/26421398/45009004-bb4ac580-afd3-11e8-9c83-57387aa5fe3b.png)
![wireframe 6](https://user-images.githubusercontent.com/26421398/45009006-bf76e300-afd3-11e8-928e-051cafd879ff.png)
![wireframe 7](https://user-images.githubusercontent.com/26421398/45009010-c3a30080-afd3-11e8-94cc-250ace447ab0.png)
![wireframe 8](https://user-images.githubusercontent.com/26421398/45009012-c9004b00-afd3-11e8-919a-2859a856fba2.png)
![wireframe 9](https://user-images.githubusercontent.com/26421398/45009016-cd2c6880-afd3-11e8-955e-9a5027d6691d.png)

# Plans for execution

I plan to use a react video player package similar to https://video-react.js.org/ for displaying the videos and then use modals to display the quizes. For storing videos, I found several solutions for uploading files. For reference, packages i found work with coudinary, react-dropzone, amazons S3 or firebase. 
https://cloudinary.com/documentation/react_image_and_video_upload
https://react-dropzone.netlify.com/
