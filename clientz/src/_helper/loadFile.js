export default function load(event) {
  
    this.file1 = event.target.files[0];
    this.channel.Profile_Picture = URL.createObjectURL(event.target.files[0]);

  
}