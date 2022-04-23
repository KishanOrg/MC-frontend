import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionsComponent } from './pages/admin/add-questions/add-questions.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent} from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/guard/admin.guard';
import { NormalGuardGuard } from './services/guard/normal-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path : 'signup',
    component : SignupComponent,
    pathMatch : 'full',
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: "admin",
    component: DashboardComponent,
    // pathMatch: 'full',
    canActivate : [AdminGuard],
    children : [
      {
        path : '',
        component : WelcomeComponent,
      },
      {
        path : 'profile',
        component : ProfileComponent,
      },
      {
        path : 'view-categories',
        component : ViewCategoriesComponent,
      },
      {
        path : 'add-category',
        component : AddCategoryComponent,
      },
      {
        path : 'view-quizzes',
        component : ViewQuizzesComponent,
      },
      {
        path : 'add-quiz',
        component : AddQuizComponent,
      },
      {
        path : 'quiz/:qId',
        component : UpdateQuizComponent,
      },
      {
        path : 'view-questions/:qId/:title',
        component : ViewQuizQuestionsComponent,
      },
      {
        path : "add-questions/:qId/:title",
        component : AddQuestionsComponent,
      },
      {
        path : "update-question/:quesId",
        component : UpdateQuestionComponent,
      },
      {
        path : "update-category/:cid",
        component : UpdateCategoryComponent,
      }
    ]
  },
  {
    path: "user",
    component: UserDashboardComponent,
    // pathMatch: 'full',
    canActivate: [NormalGuardGuard],
    children : [
      {
        path : ":cid",
        component : LoadQuizComponent,
      },
      {
        path : "instructions/:qId",
        component : InstructionsComponent,
      }
    ]
  },
  {
    path : "start/:qId",
    component : StartComponent,
  },
  {
    path: "**",
    component: ErrorComponent,
    canActivate : [NormalGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
