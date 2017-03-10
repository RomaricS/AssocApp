import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  nom = "Votre Compagnie";
  description = `Inter quos Paulus eminebat notarius ortus in Hispania, glabro quidam sub vultu latens,
  odorandi vias periculorum occultas perquam sagax. is in Brittanniam missus ut militares
  quosdam perduceret ausos conspirasse Magnentio, cum reniti non possent, iussa licentius 
  supergressus fluminis modo fortunis conplurium sese repentinus infudit et ferebatur per 
  strages multiplices ac ruinas, vinculis membra ingenuorum adfligens et quosdam obterens manicis,
  crimina scilicet multa consarcinando a veritate longe discreta. unde admissum est facinus impium,
  quod Constanti tempus nota inusserat sempiterna.`;




}
