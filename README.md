# React + Vite

## **Concept**

**Help people to be employable!**

Drops2Ocean is a platform dedicated to supporting individuals in advancing their learning, skills, and networking opportunities.Whether you’re looking to **upgrade your skillset**, prepare for the **next job interview**, or make **valuable connections**, **Drops2Ocean** is here to support you every step of the way.

## **Features**

- Crowdfunding functionality for employability goals.
- Progress tracking and status updates for campaigns.
- User pledge and commenting system.
- Delete project will close the project, but not delete the project card
- Edit project available

## **Used**

- Enable media upload
- progress bar
- Error handling for making projects/pledges
- Error handling for login

---

## **How to Use**

🛑 **Note:** The Heroku dynos for this app have been scaled down to zero to avoid unnecessary usage. If you'd like to see the app live, feel free to contact me, and I can reactivate it temporarily.

1. Visit [Drops2Ocean](https://drops2ocean.netlify.app/).
2. Browse existing projects or create a new one after you signed up.
3. Make pledges to support others on their learning journey.

Below please find the screenshots of the website including public homepage, signup, login, user homepage, create new project, make a pledge and comment, close a project, edit or delete the project.

---

![Public HomePage](screenshots/homepage_for_public.png)
![Sign-Up Page error](screenshots/signup_error_handling_match.png)
![Sign-Up Page error](screenshots/signup_error_handling.png)
![Login](screenshots/login.png)
![Homepage](screenshots/homepage_for_users.png)
![Create Project Page](screenshots/create_project_page.png)
![Project Created](screenshots/project_created.png)
![Pledge test](screenshots/test_for_pledge.png)
![Pledge test error](screenshots/test_for_pledge_calculator_error_handling.png)
![Project Card - Closed](screenshots/last_pledge_project_closed.png)
![Project edited](screenshots/test_edit.png)
![Project edited successfully](screenshots/test_edit_successfully.png)
![Project Deleted](screenshots/test_delete.png)
![Project Deleted successfully](screenshots/project_deleted.png)

Alternatively, you can run the project locally by following the steps below. 👇

### 🔹 1. Clone the Repositories

```bash
git clone https://github.com/BehnazShojaei/crowdfunding_back_end.git
git clone https://github.com/BehnazShojaei/Drops2Ocean.git
```

---

### 🔹 2. Start the Backend (Django)

1. Navigate to the backend project folder:

```bash
cd crowdfunding_back_end
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the dependencies:

```bash
pip install -r requirements.txt
```

4. Run the development server:

```bash
python manage.py runserver
```

The backend will now be running at:  
`http://127.0.0.1:8000`

---

### 🔹 3. Start the Frontend (React + Vite)

1. Open a new terminal window/tab and navigate to the frontend project folder:

```bash
cd ../Drops2Ocean
```

2. Create a `.env` file in the root of the project, and add:

```
VITE_API_URL=http://127.0.0.1:8000
```

3. Install the dependencies:

```bash
npm install
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend will now be available at:  
`http://localhost:5173`

---

## **Future Enhancements**

- User Profiles.
- Search and Filter Features.
- Better UI experience
