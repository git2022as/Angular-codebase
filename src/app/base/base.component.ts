import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { StaticDialogNgxBootstrapComponent } from '../shared/static-dialog-material/static-dialog-ngxBootstrap.component';
import { AppCacheService } from '../services/app.cache.service';
import { CommonService } from '../services/common.service';

/*Example of observable */
import {Observable, of} from 'rxjs'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, OnDestroy {
  title: string = 'kebabHouse'
  caouselInterval: number = 2000
  slides: Array<any> = [
    {
      src: 'assets/images/chicken-slider.png',
      alt_text: 'chicken-slider',
      text: 'Delicious Chicken Kebab',
    },
    {
      src: 'assets/images/fish-slider.jpg',
      alt_text: 'fish-slider',
      text: 'Crispy Fish Kebab',
    },
    {
      src: 'assets/images/paner-slider.png',
      alt_text: 'paner-slider',
      text: 'Veggy Paneer Kebab',
    },
    {
      src: 'assets/images/mutton-slider.jpg',
      alt_text: 'mutton-slider',
      text: 'Spicy Mutton Kebab',
    },
  ]

  //sample product section
  allProducts: Array<any> = [
    {
      name: 'Paneer Tikka Kebab',
      origin: 'Veg',
      image: 'paneer-tikka-small.png',
      alt: 'paneer-tikka',
      description:
        'Paneer Tikka is an Indian dish made from chunks of paneer marinated in spices and grilled in a tandoor.',
      productQuantity: 6,
      price: 180,
      addOn: 'green chatni & meyonnaise',
      itemId: 1,
    },
    {
      name: 'Paneer Hariyali Kebab',
      origin: 'Veg',
      image: 'paneer-hariyali-small.png',
      alt: 'paneer-hariyali',
      description:
        'Hariyali Paneer Tikka is a delectable Indian appetizer made with cubes of soft paneer, crisp bell pepper, and onions marinated in cilantro, and mint, along with yogurt and spices.',
      productQuantity: 6,
      price: 200,
      addOn: 'green chatni & meyonnaise',
      itemId: 2,
    },
    {
      name: 'Tandoori Aloo',
      origin: 'Veg',
      image: 'tandoori-aloo-small.png',
      alt: 'tandoori-aloo',
      description:
        'Tandoori Aloo or Tandoori Aloo Tikka is one of our favorite starter dishes which we order often in restaurants.',
      productQuantity: 8,
      price: 200,
      addOn: 'green chatni & meyonnaise',
      itemId: 3,
    },
    {
      name: 'Chicken Reshmi Kebab',
      origin: 'Non-Veg',
      image: 'chicken-reshmi-small.png',
      alt: 'chicken-reshmi',
      description:
        "Reshmi is an Indian word that means 'silk'. This is an apt description for these silky-textured, delicious chicken kababs that are a traditional Mughlai dish prepared in India.",
      productQuantity: 6,
      price: 250,
      addOn: 'green & red chatni',
      itemId: 4,
    },
    {
      name: 'Chicken Malai Kebab',
      origin: 'Non-Veg',
      image: 'chicken-malai-small.png',
      alt: 'chicken-malai',
      description:
        'Chicken Malai refers to grilled supreme of chicken with ginger, garlic, green chilli, cream-cheese, coriander-stem and cardamom.',
      productQuantity: 6,
      price: 260,
      addOn: 'green & red chatni',
      itemId: 5,
    },
    {
      name: 'Chicken Tengri',
      origin: 'Non-Veg',
      image: 'chicken-tengri-small.png',
      alt: 'chicken-tengri',
      description:
        "A marinade of garlic, ginger, garam masala, turmeric and chilli gives chicken drumsticks a dose of sub-continental spice in Alfred Prasad's tangdi kabab recipe.",
      productQuantity: 6,
      price: 280,
      addOn: 'green chatni & meyonnaise',
      itemId: 6,
    },
    {
      name: 'Chicken Tikka Kebab',
      origin: 'Non-Veg',
      image: 'chicken-tikka-small.png',
      alt: 'chicken-tikka',
      description:
        'Chicken Tikka Kebab is a delicious appetizer that is packed with flavor. It starts with chicken pieces marinated in yogurt along with lime juice and aromatic spices, then threaded onto skewers and cooked to create a delicious appetizer.',
      productQuantity: 6,
      price: 250,
      addOn: 'green chatni & meyonnaise',
      itemId: 7,
    },
    {
      name: 'Chicken Wings',
      origin: 'Non-Veg',
      image: 'chicken-wings-small.png',
      alt: 'chicken-wings',
      description:
        'Drums, or drumettes, resemble small chicken legs, with a single, main bone running through the middle.',
      productQuantity: 6,
      price: 300,
      addOn: 'green chatni & meyonnaise',
      itemId: 8,
    },
    {
      name: 'Mutton Kakori Kebab',
      origin: 'Non-Veg',
      image: 'mutton-kakori-small.png',
      alt: 'mutton-kakori',
      description:
        'Kakori Kebabs is a delicious Mughlai recipe that is prepared with mutton, onions and lots of spices. These kebabs are soft too.',
      productQuantity: 4,
      price: 300,
      addOn: 'green chatni & meyonnaise',
      itemId: 9,
    },
    {
      name: 'Mutton Boti Kebab',
      origin: 'Non-Veg',
      image: 'mutton-boti-small.png',
      alt: 'mutton-boti',
      description:
        'Mutton Boti is a popular dish from the southern part of our country. It is made with mutton (goat meat) that is marinated in spices and then grilled.',
      productQuantity: 6,
      price: 330,
      addOn: 'green chatni & meyonnaise',
      itemId: 10,
    },
    {
      name: 'Mutton Tikka Kebab',
      origin: 'Non-Veg',
      image: 'mutton-tikka-small.png',
      alt: 'mutton-tikka',
      description:
        'Mutton Boti Tikka is a popular dish from the southern part of our country. It is made with mutton (goat meat) that is marinated in spices and then grilled.',
      productQuantity: 6,
      price: 330,
      addOn: 'green chatni & meyonnaise',
      itemId: 11,
    },
    {
      name: 'Fish Tikka Kebab',
      origin: 'Non-Veg',
      image: 'fish-tikka-small.png',
      alt: 'fish-tikka',
      description:
        'Lasooni fish tikka is one of the most delicious and flavourful dishes made from fish. The fish pieces are marinated with many herbs, spices, and yoghurt to get the best possible taste.',
      productQuantity: 4,
      price: 300,
      addOn: 'green chatni & meyonnaise',
      itemId: 12,
    },
    {
      name: 'Prawn Tandoori',
      origin: 'Non-Veg',
      image: 'prawn-tandoori-small.png',
      alt: 'prawn-tandoori',
      description:
        'Tandoori Prawns are the grilled shrimp skewers loaded with the bold Indian flavors.',
      productQuantity: 4,
      price: 350,
      addOn: 'green chatni & meyonnaise',
      itemId: 13,
    }
  ]

  //sample for branches
  allBranches = [
    {
      location: 'Kasba',
      img: 'kasba.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Rajarhat',
      img: 'rajarhat.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Golpark',
      img: 'golpark.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Shyambazar',
      img: 'shyambazar.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Golpark',
      img: 'golpark.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Barrackpore',
      img: 'barrackpore.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'Serampore',
      img: 'serampore.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
    {
      location: 'kalighat',
      img: 'kalighat.jpg',
      contact: '+91 9045220123, +91 9925256398',
      timing: '11 AM - 11 PM',
    },
  ]

  /* basic testing of creation of an OBSERVABLE */

  test = new Observable((res) => {
    console.log('Observable has been created')
    //Observable has 3 methods() => next, complete & error
    res.next(1)
    res.next(2)
    res.next(3)
    res.error(new Error('Hi I am an error'))
    //This data has been streamed as we will get the below output
    //1
    //2
    //3
  })

  //with OF operator
  testOF = of('Hello', [1, 2, 3, 4, 5, 6]) //OF operator will emit complete method as well

  //we need to subscribe the observable
  testSubscription: Subscription | undefined
  test1Subscription: Subscription | undefined
  /* ends here */

  constructor(private appCacheService: AppCacheService,
              private commonService: CommonService,
              private bsModalRef: BsModalRef) {}

  ngOnDestroy(): void {
    this.testSubscription
      ? this.testSubscription.unsubscribe
      : this.testSubscription
    console.log('unsubscribed hits')
  }

  ngOnInit(): void {
    //call 3 APIs => dish, offers, card-carosul 
    //save products in app.cache.service
    this.appCacheService._dishesDetails = this.allProducts;
    this.testSubscription = this.test.subscribe(
      (res: any) => {
        //SUBSCRIBER also has 3 callback options parameters => next, error, complete
        console.log(res)
      },
      (error: any) => {
        console.log(error)
      },
      () => {
        console.log('observable emitted complete signal')
      }
    )

    this.test1Subscription = this.testOF.subscribe(
      (res: any) => {
        console.log(res)
      },
      (error) => {
        console.log(error.message)
      },
      () => {
        console.log('observable emitted complete signal')
      }
    )
  }

  myEvent(evt: string) {
    console.log(evt)
  }

  previous(): void {
    let lastValue = this.allBranches.pop()!
    this.allBranches.unshift(lastValue)
  }

  next(): void {
    let firstValue = this.allBranches.shift()!
    this.allBranches.push(firstValue)
  }

  openPhoneDialog(event: any): void {
    const number = event.contact.split(',')
    const initialState: ModalOptions = {
      initialState: {
        content: number,
        title: `${event.location}'s Contact Details`,
        type: 'info',
        data: 'list',
        primaryButtonText: 'Cancel',
      },
    }
    this.bsModalRef = this.commonService.openStaticModal(initialState);
  }
}
