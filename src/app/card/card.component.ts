import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormGroupDirective} from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { Politique, politiques } from '../politique';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('politiquesAnimation', [
      state('active', style({
        opacity: '1' 
      })),
      transition('void => *', [
        style({transform: 'translateY(-100px)', opacity: '0'}),
        animate('1500ms ease-in-out')
      ])
    ])
  ]
})
export class CardComponent implements OnInit {

  // ArrayList of jobs
  jobs = ["Banquier", "Boxeur", "Vendeur", "Maire", "Député", "Préfet", "Président", "DRH"];

  // Initialization of politiques variable which will to save all politiques
  public politiques;

  // Initialization of reactivForm
  reactForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  /**
   * Allow to return an observable of politiques
   * @return Observable
   */
  getAllPolitiques(): Observable<Politique[]> {
    return of(politiques).pipe();
  }

  /**
   * Allow to add a politique
   * @param politique
   */
  addPolitique(politique: Politique){
    const newPolitique = politiques.unshift(politique);
    return of(newPolitique).pipe();
  }

  ngOnInit() {
    this.getPolitiques();
    this.addProfession();
  }

  /**
   * Allow to show all politiques
   */
  getPolitiques() {
    this.getAllPolitiques().subscribe(
      data => { this.politiques = data},
      err => console.log(err)
    )
  }

  /**
   * Allow to create the reactive form
   */
  createForm() {
    this.reactForm = this.fb.group({
        id: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        professions: this.fb.array([]),
        description: ['', Validators.compose([Validators.required, Validators.minLength(15)])],
        imageUrl: ['', Validators.compose([Validators.required, this.urlValid])]
    });
  }

  /**
   * Allow to get the reactive form into view
   */
  get professionForm() {
    return this.reactForm.get('professions') as FormArray;
  }

  /**
   * Allow to add a profession into form array
   */
  addProfession() {
    const profession = this.fb.group({
      skill: []
    })
    this.professionForm.push(profession);
  }


  /**
   * Allow to submit the form
   * @param formDirective
   */
  onSubmit(formDirective: FormGroupDirective) {
    let politiqueForm = this.reactForm.value;

    let stock = [];
    this.professionForm.value.forEach((value) => stock.push(value.skill));

    const politique: Politique = {
      id: politiqueForm.id,
      firstName: politiqueForm.firstName,
      lastName: politiqueForm.lastName,
      professions: stock,
      description: politiqueForm.description,
      imageUrl: politiqueForm.imageUrl,
    };

    this.addPolitique(politique).subscribe(
      data => {
        this.getPolitiques();
        return true;
      },
      err => {
        console.log("Error saving politique");
        return Observable.throw(err);
      }
    );
    formDirective.resetForm();
    this.rebuildForm();
  }

  /**
   * Allow to reset the from
   */
  rebuildForm() {
    this.reactForm.reset({
        id: '',
        firstName: '',
        lastName: '',
        professions: [],
        description: '',
        imageUrl: ''
    })
  }

  /**
   * Custom validator
   * Allow to generate a validation in urlImage field
   * @param control 
   */
  urlValid(control: AbstractControl): {[key: string] : any} | null {
    const url: string = control.value;
    const regex: RegExp = RegExp(/^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/);
    if(regex.test(url)){
      return null
    } else {
      return {urlValid: true};
    }
  }

}
